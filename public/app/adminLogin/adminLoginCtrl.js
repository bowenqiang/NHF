(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('adminLoginCtrl', ['$scope','$http','$location','dataFactory',function($scope,$http,$location,dataFactory){
            
            let init = () =>{
                //call api to init $scope.station with the data from database;
                //$scope.stations = ["Discovery Zooe", "HCS Talk", "Portability Station"]; //hard coded
                $http.get('/api/getstations').then(function(res){
                    console.log(res.data);
                    $scope.stations = res.data;
                });

            };
            init();
            $scope.login = () => {
                $http.post('http://127.0.0.1:8081/api/validateAdmin',$scope.user).then(function(res){
                    console.log(res.data);
                    if(res.data!=0){
                        dataFactory.setIdStation($scope.user.selectedStation);
                        $location.path('/login');
                    }else{
                        alert('Wrong IPad Name or Password!');
                    }

                });

            }            
        }]);

}());