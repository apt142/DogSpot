//
// Location Model
// =============================================================================
//
// * Author: [Cris Bettis][apt142@gmail.com]
// * Since: 11/11/2013
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  'use strict';

  var Backbone = require('backbone_loader');

  require('underscore_string');

  return Backbone.Model.extend({
    // TODO: Url for dog CRUD,
    parse: function (response) {
      return response.location || response;
    }
  });

});

/* End of file location.js */
