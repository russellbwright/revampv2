angular.module('myApp', ['ui.router', 'ngFileUpload']).config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home',{
            url:'/',
            templateUrl:"./src/components/home/home.html",
            controller:"homeCtrl",
            resolve: {
                user: projectService => projectService.getUser()
                    .then(response => 
                        response.data)
                    .catch(err => err)
            }
        })

        .state('login', {
            url:'/login',
            templateUrl:"./src/components/login/login.html",
            controller:"loginCtrl"
        })

        .state('projects', {
            url:'/projectslist',
            templateUrl:"./src/components/projectList/projectList.html",
            controller: "projectCtrl",
            resolve: {
                user: projectService => projectService.getUser()
                    .then(response => 
                        response.data)
                    .catch(err => err)
            }
        })

        .state('addProject', {
            url:'/addProject',
            templateUrl:"./src/components/addProject/addProject.html",
            controller: "projectCtrl",
            resolve: {
                user: projectService => projectService.getUser()
                    .then(response => 
                        response.data)
                    .catch(err => err)
            }
        })

        .state('singleProject', {
            url:'/singleProject/:id',
            templateUrl:"./src/components/singleProject/singleProject.html",
            controller:"singleProjectCtrl",
            resolve: {
                user: projectService => projectService.getUser()
                    .then(response => 
                        response.data)
                    .catch(err => err)
            }
        })

        .state('register', {
            url:'/register',
            templateUrl: "./src/components/register/register.html",
            controller: "registerCtrl"
        })

        .state('myProjects', {
            url:'/myprojects',
            templateUrl: "./src/components/myProjects/myProjects.html",
            controller: "myProjectsCtrl",
            resolve: {
                user: projectService => projectService.getUser()
                    .then(response => 
                        response.data)
                    .catch(err => err)
            }
        })

        .state('myBids', {
            url:'/myBids',
            templateUrl: "./src/components/myBids/myBids.html",
            controller: "myBidsCtrl",
            resolve: {
                user: projectService => projectService.getUser()
                    .then(response => 
                        response.data)
                    .catch(err => err)
            }
        })

        .state('singleBid', {
            url: '/singleBid/:id',
            templateUrl: "./src/components/singleBid/singleBid.html",
            controller: "singleBidCtrl",
            resolve: {
                user: projectService => projectService.getUser()
                    .then(response => 
                        response.data)
                    .catch(err => err)
            }
        })

        .state('mySingleProject', {
            url: '/mySingleProject/:id',
            templateUrl: "./src/components/mySingleProject/mySingleProject.html",
            controller: "mySingleProjectCtrl",
            resolve: {
                user: projectService => projectService.getUser()
                    .then(response => 
                        response.data)
                    .catch(err => err)
            }
        })

        .state('managers', {
            url: '/managers',
            templateUrl: "./src/components/managers/managers.html",

        })

        .state('contractors', {
            url: '/contractors',
            templateUrl: './src/components/contractors/contractors.html',
        })

        .state('myProfile', {
            url:'/myProfile',
            templateUrl: './src/components/myProfile/myProfile.html',
            controller: "myProfileCtrl",
            resolve: {
                user: projectService => projectService.getUser()
                    .then(response => 
                        response.data)
                    .catch(err => err)
            }
         })

        $urlRouterProvider
            .otherwise('/');

        
})