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
      Backbone        = require('backbone_loader'),
      DogModel        = require('models/dog'),
      DogView         = require('views/dogs/view');

  return Backbone.Router.extend({

    routes: {
      ''    : 'listDogs',
      'new' : 'newDogForm',
      ':id' : 'dogDetail'
    },

    dogDetail: function (id) {
      var view, model;

      model = new DogModel({ id: id });
      view = new DogView({
        model: model
      });

      model.fetch().done(function () {
        app.mainView.show(view);
      });
    },

    listDogs: function () {
      console.log('List dogs');
    },

    newDogForm: function () {
      console.log('Add a new dog');
    }
  });
});

/* End of file dogs.js */
