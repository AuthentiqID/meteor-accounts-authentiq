if(typeof Authentiq === 'undefined') {
  Authentiq = {};
}

Accounts.oauth.registerService('authentiq');

// Retrieve URL from ServiceConfiguration. Should be stored when client is first run.
Authentiq.baseUrl = function() {
  var config = ServiceConfiguration.configurations.findOne({ service: 'authentiq' });
  if(config && config.hasOwnProperty('baseUrl')) {
    var serverUrl = config.baseUrl;
    var schemaPos = serverUrl.indexOf('://');

    // Confirm schema is https:// and insert schema if it's missing
    // or check if is a localhost domain
    if(schemaPos > -1) {
      if(serverUrl.substring(0, schemaPos).toLowerCase() !== 'https'
        && !/(localhost|\.local)/i.test(serverUrl)) {

        var errMsg = "Auth server isn't SSL - " + serverUrl;
        if(Meteor.isClient) {
          alert(errMsg);
        }
        throw new Error(errMsg);
      }
      return serverUrl;
    }
    return 'https://' + serverUrl;

  // authServerUrl is not configured
  // return live Provider URL
  } else {
    return 'https://connect.authentiq.io';
  }
};

if (Meteor.isClient) {
  Meteor.loginWithAuthentiq = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Authentiq.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: _.map(
      // publish access token since it can be used from the client
      // (if transmitted over ssl or on localhost).
      // IMPORTANT: don't publish refresh token
      Authentiq.whitelistedFields.concat(['accessToken', 'expiresAt']),
      function (subfield) { return 'services.authentiq.' + subfield; }),

    forOtherUsers: _.map(
      ['name', 'given_name', 'family_name', 'middle_name', 'nickname'],
      function (subfield) { return 'services.authentiq.' + subfield; })
  });
}
