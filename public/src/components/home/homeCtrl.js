angular.module('myApp').controller('homeCtrl', function($scope, homeService, projectService, $state){

    $scope.test = homeService.test;

    homeService.users().then(users => {
        console.log(users)
        $scope.users = users.data;
    })

    projectService.projects().then(results => {
        $scope.projects = results.data;
    })

    
})