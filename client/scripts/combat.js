myApp.controller('CombatController', ['$scope', '$http', '$location', 'SelectedPlayer', function($scope, $http, $location, SelectedPlayer){
    $scope.monsters = [];
    console.log(SelectedPlayer);

    $scope.battlefield = function(){
        //$http.get('/monsters').then(function(response){
        //    $scope.monsters = response.data;
        //});
        //
        $http.get('/users/combat/'+SelectedPlayer.playerId).then(function(response){
            console.log(response.data);
            $scope.player = response.data.characters[0];
            console.log($scope.player);
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