angular.module('myApp').controller('addProjectCtrl', function($scope, projectService, $state, user, $stateParams){
    
   
    $scope.submitWhole = function(proj, image) {
        console.log(image)
        projectService.addProject(proj, user)
        .then(response => {

            projectService.uploadImage(image, response.data[0], user)
            $state.go('Home');
            
        })
    }


    
})