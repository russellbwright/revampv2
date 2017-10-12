angular.module('myApp').controller('loginCtrl', function($scope, projectService, $state, $location, $stateParams){
    
        $scope.login = function() {
            if ($scope.loginForm.$valid) {
                projectService
                .login($scope.username, $scope.password)
                .then(response => $state.go('home'))
                .catch(err => ($scope.response = 'Username or password not recognized'));
            } else {
              $scope.loginForm.$setDirty();
            }
          };
      
          projectService.setTitle('Login');
          $scope.error = $stateParams.error;
        

})