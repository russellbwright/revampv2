angular.module('myApp').controller('loginCtrl', function($scope, projectService, $state,user, $location, $stateParams){
        
        

        $scope.login = function(log) {
                
                projectService
                .login(log)
                .then(response => {
                       console.log(response)
                        
                        if(response == false){
                                $scope.val = true;
                        } else {$state.go('myProfile')}
                            
                        if($scope.logoutval == false){
                                $scope.logoutval = true;
                        }
                        
                })
                
               
           
          };
      
        

        $scope.logout = function(){
                
                projectService.logOut();
                $state.go('home')
                
        }

        
})