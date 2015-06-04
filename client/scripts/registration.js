myApp.controller('RegistrationController', ['$scope', '$http', '$location', function($scope, $http, $location){
    console.log('Registration Controller loaded');
    $scope.user = {};
    $scope.users = [];

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.register = function(user){
        $http.post('/registration', user).then($scope.go('/home'));
    };
}]);