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
                    "angular-route/angular-route.min.js",
                    "angular-resource/angular-resource.min.js"
                ],
                "dest": "public/vendors/"
            },
            angularAnimate:{
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular-animate/angular-animate.min.js",
                    "angular-animate/angular-animate.min.js.map"
                ],
                "dest": "public/vendors/"
            },
            angularClass: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular-class/angular-class.min.js"
                ],
                "dest": "public/vendors/"
            },
            css: {
                expand: true,
                cwd: "client/stylesheets/",
                src: [
                    "stylesheet.css",
                    "bootstrap.theme.min.css"
                ],
                "dest": "public/stylesheets/"
            },
            publicViews: {
                expand: true,
                cwd: "client/views/",
                src: [
                    "login.html",
                    "registration.html",
                    "player.html",
                    "combat.html",
                    "win.html",
                    "lose.html"
                ],
                "dest": "public/views/"
            },
            scripts: {
                expand: true,
                cwd: 'client/scripts/',
                src: [
                    "app.js",
                    "combat.js",
                    "login.js",
                    "lose.js",
                    "player.js",
                    "registration.js",
                    "win.js"
                ],
                "dest": "public/javascripts/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Default task(s)
    grunt.registerTask('default', ['copy', 'uglify']);

};