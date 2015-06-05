myApp.controller('CombatController', ['$scope', '$http', '$location', 'SelectedPlayer', function($scope, $http, $location, SelectedPlayer){
    //setting ng-show variables
    $scope.playButton = false;
    $scope.supplies = false;
    $scope.monster = false;
    //declaring arrays
    $scope.mansion = [];
    $scope.easyMansion = [];
    $scope.playerInventory = [];
    $scope.items = [];

    //declaring data-binded items not being set by objects within the database
    $scope.money = 0;
    $scope.bullets = 0;
    $scope.buy = 1;
    $scope.explore = 1;
    $scope.numMonsters = $scope.easyMansion.length;

    $scope.buildMansion = function(array){
        return $scope.mansion = array;
    };

    $scope.buildBasicMansion = function(array){
        var monsterId;
        for(var i = 0; i<array.length; i++) {
            if (array[i].monsterName == "Lurker") {
                monsterId = array[i]._id;
                for (var j = 0; j < 3; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }
            }
            if (array[i].monsterName == "Garrador") {
                monsterId = array[i]._id;
                for (var j = 0; j < 2; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }

            }
            if (array[i].monsterName == "Duvalia") {
                monsterId = array[i]._id;
                for (var j = 0; j < 2; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }

            }
            if (array[i].monsterName == "Proto Tyrant") {
                monsterId = array[i]._id;
                $http.get('/monsters/' + monsterId).then(function (response) {
                    $scope.easyMansion.push(response.data);
                });
            }
            if (array[i].monsterName == "Zombie Horde") {
                monsterId = array[i]._id;
                for (var j = 0; j < 3; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }

            }
            if (array[i].monsterName == "Infected Bat") {
                monsterId = array[i]._id;
                for (var j = 0; j < 3; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }

            }
            if (array[i].monsterName == "Kipepeo") {
                monsterId = array[i]._id;
                for (var j = 0; j < 3; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }
            }
            if (array[i].monsterName == "Cephalo") {
                monsterId = array[i]._id;
                for (var j = 0; j < 3; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }
            }
            if (array[i].monsterName == "Nosferatu") {
                monsterId = array[i]._id;
                for (var j = 0; j < 2; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }
            }
            if (array[i].monsterName == "Zombie") {
                monsterId = array[i]._id;
                for (var j = 0; j < 3; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }
            }
            if (array[i].monsterName == "Licker") {
                monsterId = array[i]._id;
                for (var j = 0; j < 2; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }
            }
            if (array[i].monsterName == "Iron Maiden") {
                monsterId = array[i]._id;
                for (var j = 0; j < 2; j++) {
                    $http.get('/monsters/' + monsterId).then(function (response) {
                        $scope.easyMansion.push(response.data);
                    });
                }
            }
            if (array[i].monsterName == "Albert Wesker") {
                monsterId = array[i]._id;
                $http.get('/monsters/' + monsterId).then(function (response) {
                    $scope.easyMansion.push(response.data);
                });
            }
        }

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
            $scope.buildBasicMansion(response.data);
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
            $scope.fight();
        }
    };

    $scope.fight = function(){
        $scope.outcome = $scope.easyMansion[0].monsterHealth - $scope.player.playerAttack;
        $scope.easyMansion[0].monsterHealth = $scope.outcome;
        if ($scope.outcome <= 0) {
            alert("You beat " + $scope.easyMansion[0].monsterName + "!");
            $scope.easyMansion.shift();
            if($scope.easyMansion.length === 0){
                $scope.go('/win');
            }
        }else{
            console.log($scope.player.playerHealth);
            console.log($scope.easyMansion[0].monsterAttack);
            var result = $scope.player.playerHealth - $scope.easyMansion[0].monsterAttack;
            console.log(result);
            $scope.player.playerHealth = result;
        }

        if($scope.player.playerHealth <= 0){
            $scope.go('/lose');
        }
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
        $scope.playButton = true;
        $scope.supplies = true;
        for(var i = 0; i < 5; i++){
            if(array[i].gold !== 0){
                console.log("Entering gold conditional");
                console.log($scope.money);
                $scope.money = $scope.money + array[i].gold;
                console.log($scope.money);
            }
            if(array[i].ammoReceived !== 0){
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


    $scope.shuffle = function(array){
        for (var i = array.length -1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    $scope.nextTurn = function(){
        $scope.monster = false;
        $scope.buy = 1;
        $scope.explore = 1;
        $scope.money = 0;
        $scope.player.playerAttack = 0;
        $scope.bullets = 0;
        $scope.shuffle($scope.playerInventory);
        $scope.shuffle($scope.easyMansion);
        $scope.gather($scope.playerInventory);
    };

    $scope.battlefield();
    $scope.getItems();
}]);