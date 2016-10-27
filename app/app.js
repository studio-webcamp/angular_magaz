'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'magaz',
    'myApp.tshirts',
    'myApp.cart',
    'myApp.checkout',
    'myApp.version',
    'ngMaterial',
    'ui.utils.masks'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/', {
        template: 'HOMEPAGE'
    });
    $routeProvider.when('/#!/success', {
        template: 'SUCCESS'
    });
    $routeProvider.otherwise({redirectTo: '/'});
}]);
