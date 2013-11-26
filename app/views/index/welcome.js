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
      Backbone = require('backbone_loader'),
      Dropdown = require('bootstrap/bootstrap-dropdown');

  return Backbone.View.extend({

    template: 'index/welcome',

    initialize: function (options) {
      options = options || {};
      this.navView = options.nav;
      this.dogCollection = options.dogCollection;

      // Attach a promise to this view that we can hook for a complete callback
      this.deferred = $.Deferred();
      // Extend this object with the promise interface
      this.deferred.promise(this);
    },

    render: function () {
      var view = this;
      app.fetchTemplate(view.template).done(function (tmpl) {
        view.$el.html(tmpl({
          dogs: view.collection.toJSON()
        }));
        view.deferred.resolve();
        view.deferred.done(function() {
          $(this.el).append(view.el);
          view.navView.render();
        });
      });
      return view;
    }


  });

});

/* End of file welcome.js */
