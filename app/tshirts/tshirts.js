'use strict';

angular.module('myApp.tshirts', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/tshirts', {
            templateUrl: 'tshirts/tshirts.html',
            controller: 'TshirtsCtrl'
        });
    }]);