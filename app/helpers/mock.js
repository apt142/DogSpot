//
// Data Mocking Library
// =============================================================================
//
// This uses the Vertebrae project to intercept Ajax calls and provide
// transformations. In this mock system, we intercept them and return mock data.
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 3/21/2013
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  "use strict";

  var Backbone  = require('backbone'),
      Vertebrae = require('vertebrae');

  return Backbone.Vertebrae.extend({
    routes: {
      '/pusher/auth': {
        POST: function () { return ''; }
      }
    }
  });

});

/* End of file mock.js */
