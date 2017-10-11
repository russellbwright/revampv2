angular.module('myApp').controller('projectCtrl', function($scope, projectService, $state, $stateParams){

    "use strict";

    projectService.projects().then(response => {
        // console.log(response)
        $scope.projects = response.data;
    })

    $scope.addProject = (project) => {
        // console.log(project)
        projectService.addProject(project)
            
    }

    

    $scope.deleteProject = (project) => {
        // console.log(project.projectid)
        console.log(project)
        projectService.deleteProject(project)

        projectService.projects().then(response => {
            $scope.projects = response.data;
        })
    }

    

})