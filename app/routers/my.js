//
// My Router
// Routes information for the current user
// =============================================================================
//
// * Author: [Cris Bettis][apt142@gmail.com]
// * Since: 10/8/2013
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  'use strict';

  var app           = require('app'),
    Backbone        = require('backbone_loader'),
    DogModel        = require('models/dog'),
    SummaryView     = require('views/my/summary'),
    DetailView      = require('views/my/dog-detail'),
    NavView         = require('views/common/nav'),

    DogCollection   = require('collections/dogs');

  return Backbone.Router.extend({

    routes: {
      ''    : 'summary',
      ':id' : 'dogDetail'
    },

    summary: function () {
      // Determine id from profile check
      var view, model, id = 0, navView;

      model = new DogModel({ id: id });
      navView = new NavView();
      view = new SummaryView({
        model: model,
        nav: navView
      });

      model.fetch().done(function () {
        app.mainView.show(view);
      });
    },

    dogDetail: function (id) {
      var view, dogCollection, navView;

      // TODO: Update to use a marionette collection view

      dogCollection = new DogCollection();
      navView = new NavView();

      view = new DetailView({
        collection: dogCollection,
        nav: navView
      });

      dogCollection.fetch().done(function () {
        app.mainView.show(view);
      });
    }
  });
});

/* End of file dogs.js */
