(function(){
    'use strict';

    angular
        .module('myApp')
        .factory('dataFactory', [function(){
            let factory = {
                idstation:null
            };

            factory.setIdStation = (id) =>{
                factory.idstation = id;
            };

            factory.getIdStation = () =>{
                return factory.idstation;
            };

            return factory;
        }]);


}());