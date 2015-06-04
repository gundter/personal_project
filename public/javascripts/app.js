var myApp = angular.module('myApp',['ngRoute', 'appControllers', 'ngAnimate']);

var appControllers = angular.module('appControllers', []);


myApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
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
        when('/combat',{
            templateUrl: '/views/combat.html',
            controller: 'CombatController'
        }).
        when('/win', {
            templateUrl: '/views/win.html',
            controller: 'WinController'
        }).
        when('/lose', {
            templateUrl: '/views/lose.html',
            controller: 'LoseController'
        }).
        otherwise({
            redirectTo: "/home"
        });

    $httpProvider.interceptors.push(['$location', '$q', function($location, $q) {
        return {
            response: function(response) {
                return response;
            },
            responseError: function(response) {
                if (response.status === 401)
                    alert("Incorrect Username or Password");
                    return $q.reject(response);
            }
        };
    }]);
}]);
