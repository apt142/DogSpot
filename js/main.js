/** Main js file for Dog Spotter */

// Require this stuff
require(["../bower_components/modernizr/modernizr"], function(modernizr) {
    // On init stuff for modernizr
});

require(["../bower_components/jquery/jquery"], function(jquery) {
    // On init stuff for jquery

    require(["vendor/bootstrap"], function(bootstrap) {
        // On init stuff for bootstrap
    });

    require(["../bower_components/underscore/underscore"], function(underscore) {
        // On init stuff for underscore

        require(["../bower_components/backbone/backbone"], function(backbone) {
            // On init stuff for backbone
            /* TODO: Resolve this
            require(["../bower_components/marionette/marionette"], function(marionette) {
                // On init stuff for marionette
            });
            */
        });
    });
});
