var myApp = angular.module('myApp',['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/views/login.html"
        }).
        when('/registration',{
            templateUrl: "/views/registration.html"
        }).
        when('/player',{
            templateUrl: "/views/player.html"
        }).
        otherwise({
            redirectTo: "/home"
        });
}]);

/*
when('/projects', {
    templateUrl: "/views/routes/projects.html"
}).*/
