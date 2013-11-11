//
// Dogs Router
// =============================================================================
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 10/8/2013
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  'use strict';

  var app             = require('app'),
      Backbone        = require('backbone_loader');

  return Backbone.Router.extend({

    routes: {
      '': 'searchDogs',
      '/new': 'newDogForm'
    },

    searchDogs: function () {
      window.console.log('Search for dogs');
    },

    newDogForm: function () {
      window.console.log('Search for dogs');
    }
  });
});

/* End of file dogs.js */
