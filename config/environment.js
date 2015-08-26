/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'gplaces',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    contentSecurityPolicyHeader: 'Content-Security-Policy-Report-Only',
    contentSecurityPolicy: {
      'default-src': "'self' 'unsafe-eval' http://localhost:4200 *.google.com",
      'script-src': "'self' 'unsafe-eval' http://localhost:4200 'unsafe-inline' *.google.com *.googleapis.com *.gstatic.com/", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self' 'unsafe-eval' *.gstatic.com *.googleapis.com", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' 'unsafe-inline' *", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
      'img-src': "'self' *.googleapis.com *.gstatic.com *.google.com",
      'style-src': "'self' 'unsafe-inline' *.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    //ENV.APP.LOG_RESOLVER = true;
    //ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    //ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
