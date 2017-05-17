(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('registrationCtrl', ['$http','$scope','$location','dataFactory',function($http,$scope,$location,dataFactory){
            let data = {
                idnumber:null,
                idstation:null
            };
            let init = () =>{
                $http.get('/api/getquestiondiagnosis').then(function(res){
                    console.log(res.data);
                    $scope.diagnosis = res.data.diagnosis;
                    $scope.questions = res.data.questions;
                    console.log('register init')
                });
                data.idstation=dataFactory.getIdStation();
            };
            init();

            $scope.register = () =>{
                console.log('register');
                console.log($scope.user);
                if($scope.user.password !==$scope.passwordconfirm)
                {
                    alert("password doesn't match");
                    return;
                }
                $http.post('/api/registerUser',$scope.user).then(function(res){
                    data.idnumber = res.data;
                    if(data.idnumber>0){
                        //$location.path('/login');
                        console.log(data);
                        $http.post('/api/checkin',data).then(function(res){
                            $location.path('/welcome');
                        });
                    }
                });
            };





        }]);

}());