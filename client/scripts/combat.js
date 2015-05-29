myApp.controller('CombatController', ['$scope', '$http', function($scope, $http){
    $scope.battlefield = function(){
        $http.get('/monsters').then(function(response){
            $scope.monster = response.data[0];
        });

        $http.get('/players').then(function(response){
            $scope.player = response.data[0];
        });
    };

    $scope.fight = function(){
        $scope.outcome = $scope.monster.monsterHealth - $scope.player.playerAttack;
        $scope.monster.monsterHealth = $scope.outcome;
        if ($scope.outcome <= 0){
            alert('You Won!')
        }
    };

    $scope.battlefield();
}]);