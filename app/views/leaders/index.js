//
// Index Welcome View for DogSpot
// =============================================================================
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 11/6/2012
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  "use strict";

  var $        = require('jquery'),
      app      = require('app'),
      Backbone = require('backbone_loader');

  return Backbone.View.extend({

    template: 'leaders/leaderboard',

    initialize: function (options) {
      options = options || {};
     this.model = options.model;

      // Attach a promise to this view that we can hook for a complete callback
      this.deferred = $.Deferred();
      // Extend this object with the promise interface
      this.deferred.promise(this);
    },

    render: function () {
      var view = this;
      app.fetchTemplate(view.template).done(function (tmpl) {
        view.$el.html(tmpl({
          leaders: view.model.toJSON()
        }));
        view.deferred.resolve();
      });
      return view;
    }


  });

});

/* End of file welcome.js */
