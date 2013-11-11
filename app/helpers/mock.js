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
      '/api/dogs': {
        GET: function () { return require('text!data/dogs.json'); }
      },
      '/api/dogs/?filter=recent': {
        GET: function () { return require('text!data/dogs.json'); }
      },
      '/api/dogs/:id': {
        GET: function () { return require('text!data/dog.json'); }
      }
    }
  });

});

/* End of file mock.js */
