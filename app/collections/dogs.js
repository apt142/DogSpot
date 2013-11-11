//
// Dogs Collection
// =============================================================================
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 10/15/2013
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  'use strict';

  var $        = require('jquery'),
      Backbone = require('backbone_loader'),
      DogModel = require('models/dog');

  return Backbone.Collection.extend({
    model: DogModel,
    url: '/api/dogs',
    parse: function (response) {
      return response.dogs;
    }
  });

});

/* End of file dogs.js */
