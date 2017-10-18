angular.module('myApp').controller('mySingleProjectCtrl', function($scope, projectService, user, $state, $stateParams){
    
    
   
        projectService.mySingleProject($stateParams.id).then(result => {
           console.log(result.data)
         $scope.proj = result.data[0];
         
        })



        projectService.myProjectBids($stateParams.id).then(response => {
            // console.log(response)
            
        $scope.myProjectBids = response.data;
        })




        // projectService.getBoth($stateParams.id).then(response => {
        //     $scope.myWholeProjBid = response.data;
        // })




        $scope.deleteBids = (bid) => {

            console.log(bid)
            projectService.deleteBids(bid)
        }




       



        $scope.deleteProject = (project) => {
            projectService.deleteProject(project);
        }

          
            
        

    })