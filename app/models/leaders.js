//
// Dog Model
// =============================================================================
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 10/8/2013
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  'use strict';

  var Backbone = require('backbone_loader');

  require('underscore_string');

  return Backbone.Model.extend({
    urlRoot: '/api/leaders',
    parse: function (response) {
      return response.leaders || response;
    }
  });

});

/* End of file dog.js */
