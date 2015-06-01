myApp.controller('WinController', ['$scope', '$location', function($scope, $location){


    $scope.message = 'You Won!!';

    $scope.go = function( path ){
        $location.path(path);
    };

    $scope.playAgain = function (){
        $scope.go('/combat')
    };
}]);