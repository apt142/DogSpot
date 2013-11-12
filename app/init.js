//
// Application Initialization and Setup
// =============================================================================
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 8/12/2012
//
// -----------------------------------------------------------------------------
//
require([
  'app',
  'jquery',
  'underscore',
  'backbone_loader',
  'helpers/mock',
  'routers/index',
  'routers/dogs'
], function (app, $, _, Backbone, Mock, IndexRouter, DogsRouter) {
  "use strict";

  // Organize our initializers
  var main = { init: {} };

  // Init our mock data provider
  main.init.setupMockUrls = function () {
    var mock = new Mock();
    return this;
  };

  // Instantiate our application routers
  // Remember that these prefixes go onto the url routes in our routers
  main.init.setupRouters = function () {
    var AppRouter = Backbone.RouteManager.extend({
      routes: {
        ''     : IndexRouter,
        'dogs/' : DogsRouter
      }
    });
    app.router = new AppRouter();
    return this;
  };

  // We've proven that we're authenticated, so we can start the app.
  // Trigger the initial route and enable HTML5 History API support
  main.init.startBackboneHistory = function () {
    Backbone.history.start({ pushState: true, root: app.root });
    return this;
  };

  // The jQuery ready function is the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function () {

    // In the test environment, we don't start the app since we can't connect to
    // the api, or may not be able to auth or have an auth token
    if (app.env() === 'test') { return false; }

    // Initial session fetch could preceed this
    main.init
      .setupRouters()
      .setupMockUrls()
      .startBackboneHistory();

  }); // End jQuery document load

  // `<a href="" rel="external">link</a>` will force a link to open in an
  // external window without any special window settings.
  $(document).on('click', '[rel*=external]', function (evt) {
    evt.preventDefault();
    window.open(this.href);
    return false;
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on('click', 'a[href]:not([data-bypass])', function (evt) {
    var href, root;

    // Get the absolute anchor href.
    href = { prop: $(this).prop('href'), attr: $(this).attr('href') };

    // Get the absolute root.
    root = location.protocol + '//' + location.host + app.root;

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways. The fragment is sliced from the root.
      Backbone.history.navigate(href.attr, { trigger: true, replace: false });
    }
  });

});

/* End of file init.js */
