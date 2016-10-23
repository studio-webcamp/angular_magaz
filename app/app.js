'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'magaz',
    'myApp.tshirts',
    'myApp.cart',
    'myApp.version',
    'ngMaterial'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/', {
        template: 'kuku'
    });
    $routeProvider.otherwise({redirectTo: '/'});
}]);
