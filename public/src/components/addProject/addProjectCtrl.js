angular.module('myApp').controller('addProjectCtrl', function($scope, projectService, $state, user, $stateParams){
    
   
    $scope.submitWhole = function(Proj, image) {
        console.log(image)
        console.log(Proj)
        projectService.addProject(Proj, user)
        .then(response => {

            projectService.uploadImage(image, response.data[0], user)
            $state.go('myProfile');
            
        })
    }


    
})