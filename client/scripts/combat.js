myApp.controller('CombatController', ['$scope', '$http', '$location', 'SelectedPlayer', function($scope, $http, $location, SelectedPlayer){
    $scope.mansion = [];
    $scope.easy = [];
    $scope.medium = [];
    $scope.hard = [];
    $scope.playerInventory = [];
    $scope.items = [];
    console.log(SelectedPlayer);

    $scope.buildMansion = function(array){
        return $scope.mansion = array.splice(0,3)
    };

    $scope.getItems = function (){
        $http.get('/items').then(function(response){
            console.log(response.data);
            $scope.items = response.data;
            $scope.buildInventory(response.data);
        });
    };

    $scope.buildInventory = function(array){
        var itemId;
        for (var i = 0; i < array.length; i++){
            if(array[i].name === 'Ammo x10'){
                itemId = array[i]._id;
                for(var j = 0; j < 7; j++){
                    $http.get('/items/'+itemId).then(function(response){
                        $scope.playerInventory.push(response.data);
                        console.log($scope.playerInventory);
                    });
                }
            }else if(array[i].name === 'Combat Knife'){
                itemId = array[i]._id;
                for (var j = 0; j < 2; j++){
                    $http.get('/items/'+itemId).then(function(response){
                        $scope.playerInventory.push(response.data);
                        console.log($scope.playerInventory);
                    })
                }
            }else if(array[i].name === 'Handgun'){
                itemId = array[i]._id;
                $http.get('/items/'+itemId).then(function(response){
                    $scope.playerInventory.push(response.data);
                    console.log($scope.playerInventory);
                })
            }
        }
    };

    $scope.battlefield = function(){
        $http.get('/monsters').then(function(response){
            console.log(response.data);
            $scope.buildMansion(response.data);

        });

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
        $scope.outcome = $scope.mansion[0].monsterHealth - $scope.player.playerAttack;
        $scope.mansion[0].monsterHealth = $scope.outcome;
        if ($scope.outcome <= 0) {
            $scope.mansion.shift();
            if($scope.mansion.length === 0){
                $scope.go('/win');
            }
        }else{
            console.log($scope.player.playerHealth);
            console.log($scope.mansion[0].monsterAttack);
            var result = $scope.player.playerHealth - $scope.mansion[0].monsterAttack;
            console.log(result);
            $scope.player.playerHealth = result;
        }

        if($scope.player.playerHealth <= 0){
            $scope.go('/lose');
        }
    };

    $scope.battlefield();
    $scope.getItems();
}]);