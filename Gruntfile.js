/*global module */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['js/main.js', 'js/actions/**/*.js'],
      options: {
        jshintrc: true,
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['jshint']);

};
