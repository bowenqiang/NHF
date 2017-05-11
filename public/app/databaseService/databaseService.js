(function(){
    'use strict';

    angular
        .module('myApp')
        .service('databaseService', ['$http',function($http){

            this.adminLoginHandler = () =>{
                $http.get('/api/adminLogin').then(successCallback,errorCallback);

            }

        }])
}());