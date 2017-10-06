angular.module('myApp').controller('homeCtrl', function($scope, homeService, $state){

    $scope.test = homeService.test;

    homeService.users().then(users => {
        console.log(users)
        $scope.users = users.data;
    })
})