'use strict';

angular.module('myApp.checkout', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/checkout', {
            templateUrl: 'checkout/checkout.html',
            controller: 'CheckoutCtrl'
        });
    }])

    .controller('CheckoutCtrl', ['$scope', '$location', 'Magaz', function ($scope, $location, Magaz) {
        Magaz.getCitiesList().then(function (cities) {
            $scope.cities = cities;
        });
        $scope.orders = Magaz.getOrders();

        $scope.confirmOrder = function() {
            $scope.orders.forEach(function(order) {
                order.setTotalPrice();
            });
            console.log($scope.orders);
            $location.path('/#!/success')
        }
    }]);
