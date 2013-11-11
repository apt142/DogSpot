//
// NVD3 Shim for IE
// =============================================================================
//
// IE can't render the SVG, but in addition, it'll actually crash if it just
// tries to load the library. So, we add this shim to nerf a couple of methods
// that IE will choke on.
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 8/12/2012
//
// -----------------------------------------------------------------------------
//
if (window.$('html').hasClass('no-svg')) {
  window.nv.addGraph = function () {};
  window.d3.time = {};
}

/* End of file nvd3.js */
