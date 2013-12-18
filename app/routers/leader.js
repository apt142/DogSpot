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
      LeaderModel     = require('models/leaders'),
      LeaderView      = require('views/leaders/index');

  return Backbone.Router.extend({

    routes: {
      ''    : 'listLeaders'
    },

    listLeaders: function () {
      var view, model;

      model = new LeaderModel();
      view = new LeaderView({
        model: model
      });

      model.fetch().done(function () {
        app.mainView.show(view);
      });
    }
  });
});

/* End of file dogs.js */
