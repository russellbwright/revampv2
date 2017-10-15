angular.module('myApp').controller('mySingleProjectCtrl', function($scope, projectService, user, $state, $stateParams){
    
    
   
        projectService.mySingleProject($stateParams.id).then(result => {
           console.log(result.data)
         $scope.proj = result.data[0];
         
        })
       
        // projectService.myProjectBids().then(response => {
        //     // console.log(response)
        //     $scope.myProjectBids = response.data;
        // })
        

    })