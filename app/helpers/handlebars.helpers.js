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

});

/* End of file handlebars.helpers.js */
