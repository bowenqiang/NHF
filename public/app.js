(function(){
    'use strict';

    angular
        .module('myApp',['ngRoute','ui.select','ngSanitize'])
        .config(function($routeProvider,$locationProvider){
            $locationProvider.html5Mode(false).hashPrefix('');
            // $locationProvider.html5Mode(true);
            $routeProvider
            .when('/',{
                templateUrl:"/public/app/adminLogin/adminLogin.html",
                controller:"adminLoginCtrl",
                controllerAs:"adminLogin"
            })
            .when('/login',{
                templateUrl:"/public/app/userLogin/userLogin.html",
                controller:"userLoginCtrl",
                controllerAs:"userLogin"
            })
            .when('/register',{
                templateUrl:'/public/app/registration/registration.html',
                controller:'registrationCtrl',
                controllerAs:'registration'
            })
            .when('/welcome',{
                templateUrl:"/public/app/welcome/welcome.html",
                controller:'welcomeCtrl',
                controllerAs:'welcome'
            })
            .otherwise({
                template:"The page is no longer exist!"
            }
            );

        });


}());