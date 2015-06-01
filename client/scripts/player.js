myApp.factory('SelectedPlayer', function(){
    return {playerId: ''};
});

myApp.controller('PlayerController', ['$scope', '$http', '$location', 'SelectedPlayer', function($scope, $http, $location, SelectedPlayer){
    console.log('Player Controller loaded');
    $scope.player.playerName = {};

    $scope.randomNumber = function(min, max){
        return Math.floor(Math.random() * (1 + max - min) + min);
    };

    $scope.go = function (path){
        $location.path(path);
    };

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
    };
    $scope.getPlayers = function(){
        $http.get('/users/getPlayers').then(function(response){
            $scope.players = response.data;
            $scope.health = false;
            $scope.player.playerName = '';
        });
    };

    $scope.add = function(player){
        console.log("Entering Add function");
        $scope.player.playerAttack = 0;
        $http.post('/users/add', player).then($scope.getPlayers());
    };

    $scope.delete = function(player){
      console.log('delete: ', player);
        $http.delete('/users/'+ player._id, player).then($scope.getPlayers());
    };

    $scope.selectPlayer = function(player){
        SelectedPlayer.playerId = player._id;
        console.log(SelectedPlayer.playerId);
        $scope.go('/combat');
    };

    $scope.getPlayers();
}]);