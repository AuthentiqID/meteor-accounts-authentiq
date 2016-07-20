# meteor-accounts-authentiq

Authentiq service for use with Meteor Accounts.

### Setup

1. Create an Authentiq Client ID at [Authentiq Dashboard](https://dashboard.authentiq.com/).
2. Go to your application and configure the login service from server-side code:

~~~js
ServiceConfiguration.configurations.remove({ service: 'authentiq' });
ServiceConfiguration.configurations.insert({
  service:      'authentiq',
  // baseUrl:       '{YOUR_AUTHENTIQ_DOMAIN}',     // for development purposes or on-premise installations
  clientId:     '{YOUR_AUTHENTIQ_CLIENT_ID}',
  clientSecret: '{YOUR_AUTHENTIQ_CLIENT_SECRET}'
});
~~~

ServiceConfiguration.configurations is exported by the service-configuration package:

    meteor add service-configuration

### Usage

1. `meteor add authentiqid:accounts-authentiq`
2. Use [accounts-ui](http://docs.meteor.com/#accountsui) to handle login experience, or directly call:

~~~js
Meteor.loginWithAuthentiq();
~~~

> You can find useful info about the Meteor Accounts API from [here](http://docs.meteor.com/#accounts_api).

### Package Dependencies

* accounts-base
* accounts-oauth

### Credits
Closely based on the [accounts-google package](https://github.com/meteor/meteor/tree/master/packages/accounts-google).
