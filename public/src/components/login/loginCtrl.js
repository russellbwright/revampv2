angular.module('myApp').controller('loginCtrl', function($scope, projectService, $state, $location, $stateParams){
    
        $scope.login = function(log) {
          
                projectService
                .login(log)
                .then(response => 
                       console.log(response) // $state.go('home')
                )
                .catch(err => ($scope.response = 'Username or password not recognized'));
           
          };
      
          projectService.setTitle('Login');
          $scope.error = $stateParams.error;
        

})