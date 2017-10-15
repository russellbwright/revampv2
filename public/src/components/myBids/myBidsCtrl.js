angular.module('myApp').controller('myBidsCtrl', function($scope, projectService, $state, user, $stateParams){
    
    projectService.myBids(user).then(response => {
        // console.log(response)
        $scope.myBids = response.data;
    })
    
})