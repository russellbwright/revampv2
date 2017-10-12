angular.module('myApp').controller('loginCtrl', function($scope, projectService, $state, $location){
    
        $scope.login = function() {
            if ($scope.loginForm.$valid) {
              authService
                .login($scope.username, $scope.password)
                .then(response => $state.go('locations'))
                .catch(err => ($scope.response = 'Username or password not recognized'));
            } else {
              $scope.loginForm.$setDirty();
            }
          };
      
        //   headerService.setTitle('Login');
        //   $scope.error = $stateParams.error;
        

})