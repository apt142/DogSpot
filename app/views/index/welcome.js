//
// Index Welcome View for DogSpot
// =============================================================================
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 11/6/2012
//
// -----------------------------------------------------------------------------
//
define([
  'app', 'jquery', 'underscore', 'backbone_loader'
], function (app, $, _, Backbone) {

  return Backbone.View.extend({

    template: 'index/welcome',

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

/* End of file simple.js */
