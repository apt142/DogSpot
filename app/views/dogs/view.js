//
// Dog Detail View
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

    template: 'dogs/view',

    initialize: function (options) {
      this.deferred = $.Deferred();
      this.deferred.promise(this);
    },

    render: function () {
      var view = this;
      app.fetchTemplate(view.template).done(function (tmpl) {
        view.$el.html(tmpl(view.model.toJSON()));
        view.deferred.resolve();
      });
      return view;
    }
  });

});

/* End of file view.js */
