angular.module('myApp').controller('homeCtrl', function($scope, $location, homeService, projectService, $state){

    // $scope.test = homeService.test;

   

    projectService.projects().then(results => {
        $scope.projects = results.data;
    })

    $scope.deleteProject = (project) => {
        // console.log(project.projectid)
        console.log(project)
        projectService.deleteProject(project)

        projectService.projects().then(response => {
            $scope.projects = response.data;
        })
    }

    $scope.go = function (path){
        $location.path(path)
    }
    
})