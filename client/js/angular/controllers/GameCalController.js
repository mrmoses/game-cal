angular.module('gamecal', [])
.controller('GameCalController', ['$scope', '$http', function($scope, $http) {
    
    $http({method: 'GET', url: '/gb/releases?filter=release_date:2016-01-01|2016-12-01&sort=release_date:asc'})
    .then(function(resp){
        $scope.releases = resp.data;
    }, function(resp) {
        alert("Error getting releases.");
    });
    
}]);