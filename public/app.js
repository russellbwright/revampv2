angular.module('myApp', ['ui.router', 'ngFileUpload']).config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home',{
            url:'/',
            templateUrl:"./src/components/home/home.html",
            controller:"homeCtrl",
            // resolve: {
            //     user: homeService => homeService.users()
            //         .then(response => response.data)
            //         .catch(err => err)
            // }
        })

        .state('login', {
            url:'/login',
            templateUrl:"./src/components/login/login.html",
            controller:"loginCtrl"
        })

        .state('projects', {
            url:'/projects',
            templateUrl:"./src/components/projectList/projectList.html",
            controller: "projectCtrl"
        })

        .state('addProject', {
            url:'/addProject',
            templateUrl:"./src/components/addProject/addProject.html",
            controller: "projectCtrl"
        })

        .state('singleProject', {
            url:'/singleProject/:id',
            templateUrl:"./src/components/singleProject/singleProject.html",
            controller:"singleProjectCtrl"
        })

        .state('register', {
            url:'/register',
            templateUrl: "./src/components/register/register.html",
            controller: "registerCtrl"
        })

        $urlRouterProvider
            .otherwise('/');

        
})