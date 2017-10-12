angular.module('myApp').controller('singleProjectCtrl', function($scope, projectService, $state, $stateParams){


$scope.test = "imbad"



   console.log($stateParams.id)
   projectService.singleProject($stateParams.id).then(result => {
       console.log(result.data)
       $scope.proj = result.data[0];
   })




})