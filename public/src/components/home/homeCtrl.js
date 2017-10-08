angular.module('myApp').controller('homeCtrl', function($scope, homeService, projectService, $state){

    $scope.test = homeService.test;

   

    projectService.projects().then(results => {
        $scope.projects = results.data;
    })

    
})