angular.module('myApp').controller('singleProjectCtrl', function($scope, projectService, user, $state, $stateParams){


$scope.test = "imbad"


  

   projectService.singleProject($stateParams.id).then(result => {
       console.log(result.data)
     $scope.proj = result.data[0];
     
            
              
     
   })
   

  

   $scope.addBid = (bid, projid) => {
       
        projectService.addBid(bid, user, projid)
   }


})