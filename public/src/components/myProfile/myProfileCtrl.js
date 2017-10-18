angular.module('myApp').controller('myProfileCtrl', function($scope, projectService, $state, user, $stateParams){
    
    $scope.user = user;
    
})