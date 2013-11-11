//
// Require.js AMD Configuration
// =============================================================================
//
// Set the require.js configuration for DogSpot.
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 8/12/2012
//
// -----------------------------------------------------------------------------
//
/*jshint maxlen: 1000*/

define(function () {
  'use strict';

  require.config({
    deps: ['init'],
    paths: {
      // These components come from Bower installation
      backbone:                   '../components/backbone/backbone',
      backbone_route_manager:     '../components/routemanager/backbone.routemanager',
      backbone_computed_fields:   '../components/backbone-computedfields/lib/amd/backbone.computedfields',
      backbone_filtered_collection: '../components/backbone-filtered-collection/backbone-filtered-collection',
      handlebars:                 '../components/handlebars/handlebars',
      jquery:                     '../components/jquery/jquery.min',
      moment:                     '../components/moment/moment',
      underscore:                 '../components/underscore/underscore-min',
      underscore_string:          '../components/underscore.string/lib/underscore.string',
      vertebrae:                  '../components/vertebrae/vertebrae',
      text:                       '../components/requirejs-text/text',
      json:                       '../components/requirejs-plugins/src/json',
      d3:                         '../components/d3/d3',
      nvd3_src:                   '../components/nvd3/nv.d3',

      // Our own code
      nvd3:                       'helpers/shims/nvd3',
      backbone_loader:            'helpers/backbone_loader',
      handlebars_helpers:         'helpers/handlebars.helpers',
      templates:                  'helpers/templates', // empty placeholder

      // The bootstrap elements are included individually.
      'bootstrap/bootstrap-slider':     '../components/bootstrap/js/bootstrap-slider',
      'bootstrap/bootstrap-affix':      '../components/bootstrap/js/bootstrap-affix',
      'bootstrap/bootstrap-alert':      '../components/bootstrap/js/bootstrap-alert',
      'bootstrap/bootstrap-button':     '../components/bootstrap/js/bootstrap-button',
      'bootstrap/bootstrap-carousel':   '../components/bootstrap/js/bootstrap-carousel',
      'bootstrap/bootstrap-collapse':   '../components/bootstrap/js/bootstrap-collapse',
      'bootstrap/bootstrap-dropdown':   '../components/bootstrap/js/bootstrap-dropdown',
      'bootstrap/bootstrap-modal':      '../components/bootstrap/js/bootstrap-modal',
      'bootstrap/bootstrap-popover':    '../components/bootstrap/js/bootstrap-popover',
      'bootstrap/bootstrap-scrollspy':  '../components/bootstrap/js/bootstrap-scrollspy',
      'bootstrap/bootstrap-tab':        '../components/bootstrap/js/bootstrap-tab',
      'bootstrap/bootstrap-tooltip':    '../components/bootstrap/js/bootstrap-tooltip',
      'bootstrap/bootstrap-transition': '../components/bootstrap/js/bootstrap-transition',
      'bootstrap/bootstrap-typeahead':  '../components/bootstrap/js/bootstrap-typeahead'
    },
    shim: {
      backbone:               { deps: ['underscore', 'jquery'], exports: 'Backbone' },
      backbone_route_manager: { deps: ['backbone'] },
      bootstrap:              { deps: ['jquery'] },
      handlebars:             { exports: 'Handlebars' },
      underscore:             { exports: '_' },
      underscore_string:      { deps: ['underscore'] },
      vertebrae:              { deps: ['jquery', 'backbone'] },
      nvd3_src:               { deps: ['d3'] },
      nvd3:                   { deps: ['d3', 'nvd3_src'], exports: 'nv' },

      'bootstrap/bootstrap-slider':     { deps: ['jquery'], exports: '$.fn.slider' },
      'bootstrap/bootstrap-affix':      { deps: ['jquery'], exports: '$.fn.affix' },
      'bootstrap/bootstrap-alert':      { deps: ['jquery'], exports: '$.fn.alert' },
      'bootstrap/bootstrap-button':     { deps: ['jquery'], exports: '$.fn.button' },
      'bootstrap/bootstrap-carousel':   { deps: ['jquery'], exports: '$.fn.carousel' },
      'bootstrap/bootstrap-collapse':   { deps: ['jquery'], exports: '$.fn.collapse' },
      'bootstrap/bootstrap-dropdown':   { deps: ['jquery'], exports: '$.fn.dropdown' },
      'bootstrap/bootstrap-modal':      { deps: ['jquery'], exports: '$.fn.modal' },
      'bootstrap/bootstrap-popover':    { deps: ['jquery'], exports: '$.fn.popover' },
      'bootstrap/bootstrap-scrollspy':  { deps: ['jquery'], exports: '$.fn.scrollspy'},
      'bootstrap/bootstrap-tab':        { deps: ['jquery'], exports: '$.fn.tab' },
      'bootstrap/bootstrap-tooltip':    { deps: ['jquery'], exports: '$.fn.tooltip' },
      'bootstrap/bootstrap-transition': { deps: ['jquery'], exports: '$.support.transition' },
      'bootstrap/bootstrap-typeahead':  { deps: ['jquery'], exports: '$.fn.typeahead'  }
    }
  });
});

/* End of file config.js */
