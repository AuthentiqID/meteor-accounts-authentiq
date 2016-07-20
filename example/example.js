if(Meteor.isClient) {
  // for demo purposes
  Template.registerHelper('objectToPairs',function(object){
    return _.map(object, function(value, key) {
      return {
        key: key,
        value: value
      };
    });
  });
}

if(Meteor.isServer) {

  // You can configure the Authetniq service below
  // or use the auto-configuration feature
  // by visiting site at http://localhost:3000/
  //
  // ServiceConfiguration.configurations.remove({ service: 'authentiq' });
  // ServiceConfiguration.configurations.insert({
  //   service:      'authentiq',
  //   clientId:     '{YOUR_AUTHENTIQ_CLIENT_ID}',
  //   clientSecret: '{YOUR_AUTHENTIQ_CLIENT_SECRET}'
  // });

  Meteor.startup(function() {
    // code to run on server at startup
  });
}
