angular.module('myApp').controller('projectCtrl', function($scope, projectService, $state){

    projectService.projects().then(projects => {
        console.log(projects)
        $scope.projects = projects.data;
    })

})