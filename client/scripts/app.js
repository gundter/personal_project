var myApp = angular.module('myApp',['ngRoute', 'appControllers']);

var appControllers = angular.module('appControllers', []);


myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/views/login.html",
            controller: 'LogInController'
        }).
        when('/registration',{
            templateUrl: "/views/registration.html",
            controller: 'RegistrationController'
        }).
        when('/player',{
            templateUrl: "/views/player.html",
            controller: 'PlayerController'
        }).
        otherwise({
            redirectTo: "/home"
        });
}]);

/*
when('/projects', {
    templateUrl: "/views/routes/projects.html"
}).*/
