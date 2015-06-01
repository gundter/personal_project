myApp.controller('CombatController', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.monsters = [];

    $scope.battlefield = function(){
        $http.get('/monsters').then(function(response){
            $scope.monsters = response.data;
        });

        $http.get('/players').then(function(response){
            $scope.player = response.data[0];
        });
    };

    $scope.go = function(path){
        $location.path(path);
    };

    $scope.fight = function(){
        $scope.outcome = $scope.monsters[0].monsterHealth - $scope.player.playerAttack;
        $scope.monsters[0].monsterHealth = $scope.outcome;
        if ($scope.outcome <= 0) {
            $scope.monsters.shift();
            if($scope.monsters.length === 0){
                $scope.go('/win');
            }
        }else{
            $scope.player.playerHealth = $scope.player.playerHealth - $scope.monster.monsterAttack;
        }

        if($scope.player.playerHealth <= 0){
            $scope.go('/lose');
        }
    };

    $scope.battlefield();
}]);