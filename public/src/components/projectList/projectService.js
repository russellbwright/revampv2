angular.module('myApp').service('projectService', function($http){

    this.projects = () => $http.get('/api/projects')


    this.addProject = function(project){
        console.log(project)
        return $http.post('/api/projects/createProject', [project.last, project.first, project.company, project.units, project.shortDesc, project.type])
    }, 

    this.deleteProject = function(project){
        console.log(project)
        return $http.post('/api/projects', [project.projectid])
    }

})