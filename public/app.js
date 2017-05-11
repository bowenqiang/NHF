(function(){
    'use strict';

    angular
        .module('myApp',['ngRoute'])
        .config(function($routeProvider,$locationProvider){
            $locationProvider.html5Mode(false).hashPrefix('');
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
            .otherwise({
                template:"The page is no longer exist!"
            }
            );

        });


}());