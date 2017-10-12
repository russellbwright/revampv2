angular.module('myApp').controller('loginCtrl', function($scope, loginService, $state, authService,
    headerService){
    
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
      
          headerService.setTitle('Login');
          $scope.error = $stateParams.error;
        });

})