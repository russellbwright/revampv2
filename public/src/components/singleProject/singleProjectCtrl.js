angular.module('myApp').controller('singleProjectCtrl', function($scope, projectService, $state, $stateParams){


$scope.test = "imbad"

$scope.singleProject = (id) => {
    

    projectService.singleProject(id).then(response => {
        console.log(response.data[0])
        return $scope.proj = response.data[0];
    
    })
    
   }
   
//    projectService.singleProject().then(result => {
//        console.log(result.data)
//        $scope.proj = result.data[0];
//    })

})