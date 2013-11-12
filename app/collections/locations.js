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
    DogModel = require('models/location');

  return Backbone.Collection.extend({
    model: LocationModel,
    url: '/api/locations',
    parse: function (response) {
      return response.locations;
    }
  });

});

/* End of file dogs.js */
