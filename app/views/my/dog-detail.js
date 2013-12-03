//
// My Dog Detail View for DogSpot
// =============================================================================
//
// * Author: [Cris Bettis](apt142@gmail.com)
// * Since: 11/6/2012
//
// -----------------------------------------------------------------------------
//
define(function (require) {
  "use strict";

  var $      = require('jquery'),
    app      = require('app'),
    Backbone = require('backbone_loader');

  return Backbone.View.extend({

    template: 'my/dog-detail',

    initialize: function (options) {
      options = options || {};
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
      });

      return view;
    }
  });

});

/* End of file welcome.js */
