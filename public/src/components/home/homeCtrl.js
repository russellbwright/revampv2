angular.module('myApp').controller('homeCtrl', function($scope, homeService, $state){

    $scope.test = homeService.test;

    $scope.users = homeService.users;
})