Package.describe({
  name: 'authentiqid:accounts-authentiq',
  summary: 'Login service for Authentiq accounts',
  version: '0.0.1',
  git: 'https://github.com/AuthentiqID/meteor-accounts-authentiq/'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.4');
  api.use(['underscore', 'random']);
  api.use('accounts-base', ['client', 'server']);

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('authentiqid:authentiq@0.0.1', ['client', 'server']);

  api.addFiles('authentiq_login_button.css', 'client');
  api.addFiles('authentiq.js');
});
