myApp.controller('LoseController', ['$scope', '$location', function($scope, $location){
    $scope.message = 'You Lost! :(';

    $scope.go = function( path ){
        $location.path(path);
    };

    $scope.playAgain = function (){
        $scope.go('/combat')
    };
}]);