angular.module('myApp').controller('addProjectCtrl', function($scope, projectService, $state, user, $stateParams){
    
   
    $scope.submitWhole = function(project, image) {
        console.log(image)
        projectService.addProject(project, user)
        .then(response => {
            console.log(response.data[0].projectid)
            console.log(image)
            projectService.uploadImage(image ,response.data[0], user)
        })
    }

    
})