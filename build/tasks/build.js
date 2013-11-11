//
// Build Tools for Backbone
// =============================================================================
//
// Based on the build task from jQuery-UI
// https://raw.github.com/jquery/jquery-ui/master/build/tasks/build.js
//
// * Author: [Craig Davis](craig@there4development.com)
// * Since: 8/12/2012
//
// -----------------------------------------------------------------------------
//
/*global process: true, module: true*/

module.exports = function (grunt) {
  "use strict";

  var fs       = require('fs'),
      path     = require('path'),
      Mustache = require('mustache'),
      _        = require('underscore'),
      minify   = require('html-minifier');

  // !index
  grunt.task.registerMultiTask('index',
    'Build the index html file', function () {

    var name   = this.target,
        data   = this.data,
        tpl    = path.resolve(this.data.src),
        out    = path.resolve(this.data.dest),
        config = this.data.options,
        index;

    // Let the user where we are writing to
    grunt.verbose.or.write(
        'Writing index file to .' + out.replace(process.cwd(), '') + '…'
    );

    // Add some package data to the template vars
    _.extend(config, { 'pkg': grunt.config("pkg") });

    // Read the file from the template
    tpl = grunt.file.read(tpl);

    // Run through mustache and grab the result.
    index = Mustache.to_html(tpl, config);

    if (config.compress) {
      // Setting removeComments to true causes problems with IE conditional
      // comments, leave it false
      index = minify.minify(index, {
        collapseBooleanAttributes : true,
        removeComments            : false,
        removeCommentsFromCDATA   : true,
        collapseWhitespace        : true,
        removeEmptyAttributes     : true
      });
    }

    // Write the rendered index to /index.html
    grunt.file.write(out, index);
    grunt.verbose.or.ok();
  });
};

/* End of file build.js */
