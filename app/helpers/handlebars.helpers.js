//
// Handlebars Helpers - for debugging
// =============================================================================
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 3/21/2013
//
// -----------------------------------------------------------------------------
//
define(['underscore', 'handlebars'], function (_, Handlebars) {
  "use strict";

  // usage: {{debug}} or {{debug someValue}}
  Handlebars.registerHelper('debug', function (optionalValue, options) {
    window.console.group('Handlebar Debug:');
    window.console.log(this);
    if (_.isObject(optionalValue) && _.isObject(optionalValue.hash)) {
      // this means that the {{debug}} was called without params
      return;
    } else {
      window.console.log(optionalValue);
    }
    window.console.groupEnd();
  });

  Handlebars.registerHelper('capitalize', function(value) {
    if(typeof value === 'string') {
      var str = value.toLowerCase();
      str = str.replace(/\w+/g, function(a){
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
      });
      return new Handlebars.SafeString(str);
    } else {
      return '';
    }
  });
});

/* End of file handlebars.helpers.js */
