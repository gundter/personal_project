myApp.controller('CombatController', ['$scope', '$http', '$location', 'SelectedPlayer', function($scope, $http, $location, SelectedPlayer){
    $scope.mansion = [];
    $scope.easyMansion = [];
    $scope.mediumMansion = [];
    $scope.hardMansion = [];
    $scope.playerInventory = [];
    $scope.items = [];
    $scope.money = 0;
    $scope.bullets = 0;
    $scope.supplies = false;
    $scope.buy = 1;
    $scope.explore = 1;
    $scope.monster = false;
    console.log(SelectedPlayer);

    $scope.buildMansion = function(array){
        return $scope.mansion = array;
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

    $scope.exploreMansion = function(){
        if($scope.explore <= 0){
            alert("You can only explore the mansion once per turn");
        }else{
            $scope.monster = true;
            $scope.explore -= 1;
        }
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
        $scope.monster = false;
    };

    $scope.purchase = function(item){
        if($scope.money < item.cost){
            alert("You don't have enough gold to purchase this item");
        }else{
            if($scope.buy <= 0){
                alert("You can only buy 1 item per turn");
            }else{
                $scope.playerInventory.push(item);
                console.log($scope.playerInventory);
                $scope.money -= item.cost;
                $scope.buy -= 1;
            }
        }
    };

    $scope.gather = function(array){
        $scope.supplies = true;
        for(var i = 0; i < 5; i++){
            if(array[i].gold !== null){
                console.log("Entering gold conditional");
                console.log($scope.money);
                $scope.money = $scope.money + array[i].gold;
                console.log($scope.money);
            }
            if(array[i].ammoReceived !== null){
                console.log("Entering ammo conditional");
                console.log($scope.bullets);
                $scope.bullets = $scope.bullets + array[i].ammoReceived;
                console.log($scope.bullets);
            }
        }
    };

    $scope.selected = function(item){
        if($scope.bullets < item.ammoRequired){
            alert("You don't have enough ammo for this weapon");
        }else{
            $scope.bullets -= item.ammoRequired;
            $scope.player.playerAttack += item.itemAttack;
        }
    };


    $scope.shuffleInventory = function(array){
        for (var i = array.length -1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    $scope.nextTurn = function(){
        $scope.buy = 1;
        $scope.explore = 1;
        $scope.shuffleInventory($scope.playerInventory);
        $scope.monster = false;
        $scope.money = 0;
        $scope.player.playerAttack = 0;
        $scope.bullets = 0;
        $scope.gather($scope.playerInventory);
    };

    $scope.battlefield();
    $scope.getItems();
}]);