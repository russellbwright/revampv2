angular.module('myApp').controller('projectCtrl', function($scope, projectService, $state, user, $stateParams){

    // "use strict";




    projectService.projects().then(response => {
        console.log(response)
        $scope.projects = response.data;
    })




    $scope.addProject = (project) => {
        // console.log(project)
        projectService.addProject(project, user)
            
    }

    



    $scope.deleteProject = (project) => {
        // console.log(project.projectid)
        console.log(project)
        projectService.deleteProject(project)

        projectService.projects().then(response => {
            $scope.projects = response.data;
        })
    }

   
    $scope.logout = projectService.logOut;


    
    // $scope.submitWhole = function(project, image) {
    //     console.log(image)
    //     projectService.addProject(project, user)
    //     .then(response => {
    //         console.log(response.data[0].projectid)
    //         console.log(image)
    //         projectService.uploadImage(image ,response.data[0], user)
    //     })
    // }







    

    /*******THIS IS WORKING TO GET IMAGES*********** */

    // projectService.images().then(response => {
    //     console.log(response.data)
    //     $scope.images = response.data[0];
    // })

     // $scope.submit = function(file) {
    //     projectService.uploadImage(file)
    //   }
    

})