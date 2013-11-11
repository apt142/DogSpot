//
//  Backbone Loader
// =============================================================================
//
// See the require statements for the ways that we extend our Backbone.
//

define(function (require) {
  "use strict";

  var Backbone = require('backbone');

  // Computed Model Fields from [github][cf].
  // [cf]: https://github.com/alexanderbeletsky/backbone-computedfields
  require('backbone_computed_fields');

  // Allow for more complicated [route management][rm]
  // [rm]: https://raw.github.com/tbranyen/backbone.routemanager
  require('backbone_route_manager');

  // We use this backbone_loader to extend Backbone, and now hand it on to our
  // AMD module system.
  return Backbone;

});

/* End of file backbone_loader.js */
