myApp.controller('PlayerController', ['$scope', '$http', function($scope, $http){
    console.log('Player Controller loaded');

    $scope.players = [];

    $scope.randomNumber = function(min, max){
        console.log('randomNumber works');
        return Math.floor(Math.random() * (1 + max - min) + min);
    };

    $scope.genAttack = function (){
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
    };

    $scope.genHealth = function (){
        console.log('genHealth works');
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

    $scope.submitPlayer = function (player){
        console.log(player);
        $scope.displaySubmit = true;
        $http.post('/players', player);
    };
}]);