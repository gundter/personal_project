module.exports = function(grunt){
    //Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                src: 'client/scripts/app.js',
                dest: 'public/javascripts/app.min.js'
            },
            login: {
                src: 'client/scripts/login.js',
                dest: 'public/javascripts/login.min.js'
            },
            player: {
                src: 'client/scripts/player.js',
                dest: 'public/javascripts/player.min.js'
            },
            registration: {
                src: 'client/scripts/registration.js',
                dest: 'public/javascripts/registration.min.js'
            }
        },
        copy: {
            jquery: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.min.map"
                ],
                "dest": "public/vendors/"
            },
            bootstrap: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "bootstrap/dist/css/bootstrap.min.css",
                    "bootstrap/dist/css/bootstrap.css.map",
                    "bootstrap/dist/js/bootstrap.min.js"
                ],
                "dest": "public/vendors/"
            },
            angular: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular-route/angular-route.min.js"
                ],
                "dest": "public/vendors/"
            },
            css: {
                expand: true,
                cwd: "client/stylesheets/",
                src: "stylesheet.css",
                "dest": "public/stylesheets/"
            },
            views: {
                expand: true,
                cwd: "client/views/",
                src: [
                    "login.html",
                    "registration.html",
                    "player.html"
                ],
                "dest": "public/views/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Default task(s)
    grunt.registerTask('default', ['copy', 'uglify']);

};