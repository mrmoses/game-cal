function GameCalController($scope) {
    
    $scope.releaseDates = [new Date(), new Date(), new Date()];
    
    $scope.releases = [];
    $scope.releases.push({name: "Game 1", date: new Date()});
    $scope.releases.push({name: "Game 2", date: new Date()});
    $scope.releases.push({name: "Game 3", date: new Date()});
    $scope.releases.push({name: "Game 4", date: new Date()});
}