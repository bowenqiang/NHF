(function(){
    'use strict';

    angular
        .module('myApp')
        .controller('userLoginCtrl', ['$scope','$location','$http','dataFactory',function($scope,$location,$http,dataFactory){
            $scope.user = {
                idnumber:null,
                email:"",
                idstation:null
            }
            let init = () =>{
                $scope.user.idstation=dataFactory.getIdStation();
            };

            init();

            
            $scope.login =() => {
                console.log($scope.user);
                $http.post('/api/checkin',$scope.user).then(function(res){
                    if(res.data>0){
                        $location.path('/welcome')
                    }
                    
                });

            }

            $scope.register = () =>{
                $location.path('/register');
            }
            
        }]);

}());