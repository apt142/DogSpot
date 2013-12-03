//
// DogSpot Application
// =============================================================================
//
// Application namespace and core config
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 8/12/2012
//
// -----------------------------------------------------------------------------
//
define([
  'jquery',
  'underscore',
  'backbone_loader',
  'handlebars',
  'handlebars_helpers',
  'templates'
], function ($, _, Backbone, Handlebars, HandlerbarsHelpers, JST) {
  "use strict";

  // Attach our template object to the global scope to conform to a standard
  // Handlebars convention. In dev, this is an empty object initially, but
  // in production we build a template.js file and insert it here.
  window.JST = JST;

  // Keep active application instances namespaced under an app object.
  // This can be used as a central event aggregator
  var app = {
    // We serve the app from the / of the web server
    root: '/',

    // Globally available view instances
    views: {},

    // Models instances that live the entire life of the app
    models: {},

    // Config urls from the index.html file generated from the app/config
    urls: window.config || { phx: '' },

    // Add a session handler, you can subscribe to events on this
    session: new Backbone.Model(),

    // A namespace wide router. This is used for global event triggering. In
    // main.js, we'll set this up as a Backbone.RouteManager
    router: {}
  };

  // What environment are we in?
  app.env = function () {
    if (window.jasmine) { return 'test'; }
    return $('script[data-env]').attr('data-env');
  };

  // Load a template from the server, compile it, and return
  // through the callback. In production mode, we have a
  // templates.js file that we precompile. This file will prepopulate
  // the JST var and so we won't have to async load the templates.
  app.fetchTemplate = function (path, done) {
    var self = this,
        JST = window.JST = window.JST || {},
        def = new $.Deferred();

    // Should be an instant synchronous way of getting the template, if it
    // exists in the JST object.
    if (JST[path]) {
      if (_.isFunction(done)) {
        done(JST[path]);
      }
      return def.resolve(JST[path]);
    }

    // Fetch it asynchronously if not available from JST
    // Note that some bugs pop up if the views ask for paths
    // with a leading slash. The precompiled JST object won't find
    // them, but the webserver will.
    $.ajax({
      type     : 'GET',
      dataType : 'text',
      url      : '/app/templates/' + path + '.html'
    })
    .done(function (response) {
      // The request returns the template, compile it and cache it for use
      JST[path] = Handlebars.compile(response);
      // If there is a callback return the template through it
      if (_.isFunction(done)) { done(JST[path]); }
      // Resolve the template deferred
      def.resolve(JST[path]);
    })
    .fail(function () {

      // In production, we ship with a stripped down Handlebars that doesn't
      // have the compile method, so we have to make this conditional.
      if (_.isFunction(Handlebars.compile)) {
        JST[path] = Handlebars.compile(
          '<span class="badge badge-warning">404: ' +
          path +
          '.html was not found.</span>'
        );
        if (_.isFunction(done)) { done(JST[path]); }
        def.resolve(JST[path]);
      } else { // In production land
        JST[path] = function () {};
        self.analytics.trackEvent('Errors', '404 Template', path);
        self.logError('Unable to load template: ' + path, {type: '404'});
        def.reject(JST[path]);
      }

    });

    // Ensure a normalized return value (Promise)
    return def.promise();
  };

  // TODO: Update this to use Marionette
  app.mainView = {
    // Reference to our main application container
    $el: $('#main'),

    // This is a reference to a Backbone.View that is in the #main container
    currentView: undefined,

    // Render and display a main view
    show: function (view) {
      // If we've got a view from a previous call to this code, close it
      // See the backbone_loader for more information about this.
      if (!_.isUndefined(this.currentView)) {
        this.currentView.remove();
      }

      // Scroll to the top of the page
      window.scrollTo(0, 0);

      // Save a reference and render the view in a _detached_ el, the view
      // shouldn't have an `el` set.
      this.currentView = view;
      this.currentView.render();

      // Place the node into the current main container after emptying
      this.$el.html('').append(this.currentView.el);

      // Insert headers and footers if applicable
      require(['views/common/nav'], function(NavView) {
        var navView = new NavView();
        navView.render();
      });


    }
  };

  // Application wide code, this is the ls namespace object
  return _.extend({}, app, Backbone.Events);

});

/* End of file app.js */
