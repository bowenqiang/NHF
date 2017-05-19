(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('userLoginCtrl', ['$scope', '$location', '$http', 'dataFactory', function ($scope, $location, $http, dataFactory) {
            $scope.user = {
                idnumber: null,
                email: "",
                idstation: null
            }
            function init(){
                $scope.user.idstation = dataFactory.getIdStation();
                if($scope.user.idstation===null){
                    $location.path('/');
                    return;
                }
                console.log('user inint');
                console.log($scope.user.idstation);
                console.log({ idstation: $scope.user.idstation });
                getAttendant();

            };

            init();
            function getAttendant(){
                $http.post('/api/getattendant', { idstation: $scope.user.idstation }).then(function (res) {
                    $scope.attendants = res.data;
                });
            };


            $scope.login = () => {
                console.log($scope.user);
                $http.post('/api/checkin', $scope.user).then(function (res) {
                    if (res.data > 0) {
                        //$location.path('/welcome')
                    }

                });
                getAttendant();

            }

            $scope.register = () => {
                $location.path('/register');
            }

        }]);

}());