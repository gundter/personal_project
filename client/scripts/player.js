myApp.controller('PlayerController', ['$scope', '$http', function($scope, $http){
    console.log('Player Controller loaded');

    $scope.players = [];

    $scope.randomNumber = function(min, max){
        console.log('randomNumber works');
        return Math.floor(Math.random() * (1 + max - min) + min);
    };

    $scope.genAttack = function (){
        console.log("genAttack works");
        $scope.power = true;
        return $scope.player.playerPower = $scope.randomNumber(1, 20);
    };

    $scope.genHealth = function (){
        console.log('genHealth works');
        $scope.health = true;
        return $scope.player.playerHealth = $scope.randomNumber(1, 20);
    };

    $scope.submitPlayer = function (player){
        console.log(player);
        $http.post('/players', player);
    };
}]);