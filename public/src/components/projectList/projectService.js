angular.module('myApp').service('projectService', function($http){

    this.projects = () => $http.get('/api/projects')


})