angular
.module('myApp')
.controller('registerCtrl', function ($scope, $stateParams, $state, authService) {
  $scope.register = function () {
    authService
      .register($scope.username, $scope.password)
      .then(response => $state.go('locations'))
      .catch(err => ($scope.response = 'Username or password not recognized'));
  };

  $scope.error = $stateParams.error;
});