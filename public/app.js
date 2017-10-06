angular.module('myApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home',{
            url:'/',
            templateUrl:"./src/components/home/home.html",
            controller:"homeCtrl",
            // resolve: {
            //     user: homeService => homeService.users()
            //         .then(response => response)
            //         .catch(err => err)
            // }
        })

        .state('login', {
            url:'/login',
            templateUrl:"./src/components/login/login.html",
            // controller:"loginCtrl"
        })

        $urlRouterProvider
            .otherwise('/');
})