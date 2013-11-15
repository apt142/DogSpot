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
    DogCollection   = require('collections/dogs');

  return Backbone.Router.extend({

    routes: {
      ''    : 'summary',
      ':id' : 'dogDetail'
    },

    summary: function () {
      // Determine id from profile check
      var view, model, id =0;

      model = new DogModel({ id: id });
      view = new SummaryView({
        model: model
      });

      model.fetch().done(function () {
        app.mainView.show(view);
      });
    },

    dogDetail: function (id) {
      var view, dogCollection;
      window.console.log('id:' + id);

      // TODO: Update to use a marionette collection view

      dogCollection = new DogCollection();

      view = new DetailView({
        collection: dogCollection
      });

      dogCollection.fetch().done(function () {
        app.mainView.show(view);
      });
    }
  });
});

/* End of file dogs.js */
