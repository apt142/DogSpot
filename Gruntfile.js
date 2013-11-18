/*global module, __dirname  */

module.exports = function(grunt) {
  'use strict';

  var _                   = require('underscore'),
      headerFiles         = [],
      testingPort         = 8181,
      developmentPort     = 8080,
      projectRoot         = __dirname,
      mountFolder, pushStateHook;

  mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  pushStateHook = function (url) {
    var path    = require('path'),
        request = require('request'); // Need to be added into package.json
    return function (req, res, next) {
      var ext = path.extname(req.url);
      if ((ext === "" || ext === ".html") &&
          req.url !== "/" && !/templates/.test(req.url)
      ) {
        req.pipe(request(url)).pipe(res);
      } else {
        next();
      }
    };
  };

  headerFiles = [
    'components/modernizr/modernizr.js',   // Browser feature sniffing
    'components/respond/respond.min.js',   // IE media query polyfill
    'app/helpers/modernizr_filters.js',    // Filters for modernizr
    'app/helpers/debug.js'                 // Nerf console.log + debug
  ];

  grunt.initConfig({

    // Our unit tests need a server so they can fetch templates and ajax.
    // This only runs for the duration of the current grunt.
    connect: {
      testing: {
        options: {
          port: testingPort,
          base: '.'
          //debug: true is a lifesaver for seeing the files loaded
        }
      },
      development: {
        options: {
          port: 8080,
          base: '.',
          keepalive: true,
          debug: true,
          middleware: function (connect) {
            return [
              pushStateHook("http://localhost:8080"),
              mountFolder(connect, 'assets/favicon'),
              mountFolder(connect, '')
            ];
          }
        }
      },
      rules: {
        '/favicon.ico': '/assets/favicon.ico'
      }
    },

    index: {
      dev: {
        src  : 'app/templates/index.html',
        dest : 'index.html',
        options: {
          compress            : false,
          headerScript        : 'dist/header.<%= pkg.version %>.min.js',
          coreScript          : 'components/requirejs/require.js',
          stylesheet          : '<%= less.dev.relativeUrl %>',
          buildType           : 'Development',
          year                : grunt.template.today('yyyy')
        }
      }
    },

    // Run our unit tests, we use connect to run these on a temporary server
    // https://github.com/reinseth/grunt-template-jasmine-requirejs/
    // grunt-template-jasmine-requirejs is the magic that loads our config file
    // and sets up the testing.
    jasmine: {
      dogspot: {
        options: {
          host : 'http://127.0.0.1:' + testingPort + '/',
          outfile: 'jasmine.html',
          specs: ['tests/jasmine/**/spec.js', 'tests/jasmine/**/*Spec.js'],
          vendor: [
            'components/jquery/jquery.js',
            'components/jasmine-jquery/lib/jasmine-jquery.js',
          ],
          helpers: headerFiles,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'app/config.js',
            requireConfig: {
              baseUrl: 'app/',
              paths: {
                sinon:
                  'components/sinon/lib/sinon.js',
                'jasmine-sinon':
                  'components/jasmine-sinon/lib/jasmine-sinon.js'
              }
            }
          }
        }
      }
    },

    jshint: {
      files: ['app/**/*.js', 'app/**/*.json'],
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      }
    },

    // LessCSS compilation, we don't use LessCSS javascript in dev mode,
    // we always compile, so this is also used by the watch command
    less: {
      dev: {
        src         : 'assets/css/index.less',
        dest        : 'dist/index.css',
        relativeUrl : 'dist/index.css'
      }
    },

    // A banner that we'll use in the minified files to confirm version
    // and copyright information
    meta: {
      banner: '/*!\n' +
        ' * <%= pkg.title || pkg.name %>\n' +
        ' * v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * (c) <%= pkg.author %> <%= grunt.template.today("yyyy") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' */\n'
    },

    pkg: grunt.file.readJSON('package.json'),

    // This task uses James Burke's excellent r.js AMD build tool. Note that we
    // swap the empty templates.js we use in dev for the fully built templates
    // file that we constructed in jsthb. This also allows us to use the much
    // smaller handlebars.runtime code (It doesn't have the handlerbars
    // compiler).
    requirejs: {
      release: {
        options: {
          almond: true,
          mainConfigFile: 'app/config.js',
          out: 'dist/build/require.<%= pkg.version %>.min.js',
          name: 'config',
          paths: {
            templates: '../dist/build/templates',
            handlebars: '../assets/js/handlebars.runtime',
            'routers/dev': 'routers/null'
          },
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    },

    // Compress the Header files into a single distribution
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      header: {
        files: { 'dist/header.<%= pkg.version %>.min.js': headerFiles }
      }
    },

    // Watch for file changes and perform the tasks specified. Useful for
    // keeping the less build up to date as you edit files.
    watch: {
      jshint: {
        files: '<%= jshint.all %>',
        tasks: ['jshint:all']
      },
      js: {
        files: '<%= jshint.all %>',
        tasks: ['jshint:all', 'jasmine']
      },
      index: {
        files: 'app/templates/index.html',
        tasks: ['index:dev']
      },
      css: {
        files: [
          'assets/css/**/*.css',
          'assets/css/**/*.less',
          'components/**/*.css',
          'components/**/*.less'
        ],
        tasks: ['less:dev']
      }
    }
  });


  // ## Custom and Imported Tasks
  grunt.loadNpmTasks('grunt-connect-rewrite');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.task.loadTasks('build/tasks');

  grunt.registerTask('lint', ['jshint']);

  grunt.registerTask('test', ['jshint', 'connect:testing', 'jasmine:dogspot']);

  grunt.registerTask('local', ['jshint', 'index:dev', 'connect:development']);

  grunt.registerTask('default', [
    'jshint', 'less:dev', 'uglify:header', 'index:dev'
  ]);

};
