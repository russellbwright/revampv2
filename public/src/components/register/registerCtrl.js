angular
.module('myApp')
.controller('registerCtrl', function ($scope, $stateParams, $state, projectService) {

    
  $scope.register = function (user) {
    projectService
    
      .createUser(user)
      
      $state.go('login')
      
      
  };

  
});