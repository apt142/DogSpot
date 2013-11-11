//
// Debugging Tools
// =============================================================================
//
// 1. Nerf the console.log so that if any slip out to production we don't create
//    errors in Firefox and IE.
// 2. [Provide a wrapper][log] for the console log that provides a reverse
//    chronological history in the `log.history`.
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 8/12/2012
//
// [log]: http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
// -----------------------------------------------------------------------------
//
/*global window, console, log */
/*jshint boss: true*/

// usage: log('inside coolFunc', this, arguments);
window.log = function f() {
  var args = arguments, newarr;
  log.history = log.history || [];
  log.history.push(arguments);
  if (this.console) {
    try {
      args.callee = f.caller;
    } catch (e) {}
    newarr = [].slice.call(args);
    if (typeof console.log === 'object') {
      log.apply.call(console.log, console, newarr);
    } else {
      console.log.apply(console, newarr);
    }
  }
};

// Nerf console.log so that it will never throw an error if one escapes
// to production
(function (a) {
  function b() {}
  var c, d;
  c = '' +
    'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,' +
    'groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,' +
    'warn';
  for (c = c.split(','); !!(d = c.pop());) {
    a[d] = a[d] || b;
  }
}((function () {
  try {
    console.log();
    return window.console;
  } catch (a) {
    return (window.console = {});
  }
}())));

/* End of file debug.js */
