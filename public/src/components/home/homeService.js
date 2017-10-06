angular.module('myApp').service('homeService', function($http){

    this.test = "YaBad";

    // this.users = () => $http.get('/api/users')

    // this.users = [{name: 'bucks', company: 'buckCo'}, {name: 'Buckus', company: 'BuckusCo'}]

    this.users = function() {
        return $http({
          method: 'GET',
          url: 'http://localhost:3000/api/users'
        })
      };


})