//
// Index Router
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
      Backbone        = require('backbone_loader'),
      WelcomeView     = require('views/index/welcome'),
      DogCollection   = require('collections/dogs');

  return Backbone.Router.extend({

    routes: {
      '': 'showWelcome'
    },

    showWelcome: function () {
      var view, dogCollection;

      // TODO: Update to use a marionette collection view
      dogCollection = new DogCollection();
      view = new WelcomeView({
        collection: dogCollection
      });

      // TODO: More marionette here
      dogCollection.fetch().done(function () {
        app.mainView.show(view);
      });
    }
  });
});

/* End of file index.js */
