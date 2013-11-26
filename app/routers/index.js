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

  var app                = require('app'),
      Backbone           = require('backbone_loader'),
      WelcomeView        = require('views/index/welcome'),
      NavView            = require('views/common/nav'),
      DogCollection      = require('collections/dogs');

  return Backbone.Router.extend({

    routes: {
      '': 'showWelcome'
    },

    showWelcome: function () {
      var view, navView, dogCollection;

      // TODO: Update to use a marionette collection view
      dogCollection = new DogCollection();
      navView = new NavView();
      view = new WelcomeView({
        collection: dogCollection,
        nav: navView
      });

      // TODO: More marionette here
      dogCollection.fetch().done(function () {
        app.mainView.show(view);
      });
    }
  });
});

/* End of file index.js */
