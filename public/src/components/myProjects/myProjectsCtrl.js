angular.module('myApp').controller('myProjectsCtrl', function($scope, projectService, $state, user, $stateParams){
    
    projectService.myProjects(user).then(response => {
        // console.log(response)
        $scope.myProjects = response.data;
    })

    $scope.deleteProject = (project) => {
        // console.log(project.projectid)
        console.log(project)
        projectService.deleteProject(project)

        projectService.myProjects(user).then(response => {
            $scope.myProjects = response.data;
        })
    }
    
    })