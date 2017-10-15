angular.module('myApp').controller('singleBidCtrl', function($scope, projectService, $state, user, $stateParams){
    
    projectService.singleBid($stateParams.id).then(result => {
        console.log(result.data)
      $scope.bids = result.data[0];
      
    })


    $scope.deleteBid = (bids) => {
        
        
        projectService.deleteBid(bids)

    
    }

    
})