myApp.controller('LogInController', ['$scope', '$http', '$location', function($scope, $http, $location){
    console.log('Login Controller loaded');

    $scope.user = {};
    $scope.users = [];

    $scope.go = function (path){
        $location.path(path);
    };

    $scope.logIn = function (user){
        $http.post('/', user).then(function(response){
            if(response.status === 200){
                $scope.go('/player');
            }
        });
        $scope.user = {};
    };
}]);