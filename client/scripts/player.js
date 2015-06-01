myApp.controller('PlayerController', ['$scope', '$http', function($scope, $http){
    console.log('Player Controller loaded');

    $scope.randomNumber = function(min, max){
        return Math.floor(Math.random() * (1 + max - min) + min);
    };

    /*$scope.genAttack = function (){
        console.log("genAttack works");
        $scope.attack = true;
        var value = $scope.randomNumber(1,3);
        switch (value){
            case 1:
                $scope.player.playerAttack = 30;
                break;
            case 2:
                $scope.player.playerAttack = 40;
                break;
            case 3:
                $scope.player.playerAttack = 50;
                break;
        }
        //return $scope.player.playerPower = $scope.randomNumber(1, 20);
    };*/

    $scope.genHealth = function (){
        $scope.health = true;
        var health = $scope.randomNumber(1,4);
        switch (health){
            case 1:
                $scope.player.playerHealth = 70;
                break;
            case 2:
                $scope.player.playerHealth = 80;
                break;
            case 3:
                $scope.player.playerHealth = 90;
                break;
            case 4:
                $scope.player.playerHealth = 100;
                break;
        }
        //return $scope.player.playerHealth = $scope.randomNumber(1, 20);
    };
    $scope.getPlayers = function(){
        return $http.get('/users/getPlayers').then(function(response){
            return $scope.players = response.data;
        });
    };

    $scope.add = function(player){
        console.log("Entering Add function");
        return $http.post('/users/add', player).then($scope.getPlayers());
    };

    $scope.delete = function(player){
      console.log('delete: ', player);
        $http.delete('/users/'+ player._id, player).then($scope.getPlayers());
    };

    $scope.getPlayers();
}]);