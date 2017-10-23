angular.module('myApp').controller('homeCtrl', function($scope, $location, projectService, $state){

    // $scope.test = homeService.test;

   

    projectService.projects().then(results => {
        console.log(results)
        $scope.projects = results.data;
    })


    $scope.deleteProject = (project) => {
        // console.log(project.projectid)
        console.log(project)
        projectService.deleteProject(project)

        projectService.projects().then(response => {
            $scope.projects = response.data;
        })
    }


    $scope.go = function (path){
        $location.path(path)
    }

    

    // $scope.singleProject = (project) => {
        
    //     projectService.singleProject(project).then(response => {
    //         console.log(response.data[0])
    //         return proj = response.data[0];
        
    //     })

    //    }

    //    projectService.singleProject(project).then(response => {
    //        return $scope.proj = reponse.data[0];
    //    })

      $scope.test = 'yabad'; 


    
})