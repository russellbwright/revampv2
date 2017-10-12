angular
.module('myApp')
.controller('registerCtrl', function ($scope, $stateParams, $state, projectService) {

    
  $scope.register = function () {
    projectService
    
      .register($scope.username, $scope.password)
      
      .then(response =>  
        
        $state.go('login'))
      
      .catch(err => ($scope.response = 'Username or password not recognized'));
  };

  $scope.error = $stateParams.error;
});