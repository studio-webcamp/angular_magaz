angular.module('myApp.tshirts')
    .controller('TshirtsCtrl', ['$scope', 'Magaz', function ($scope, Magaz) {
        $scope.kuku = "kuku";
        // $scope.tshirt = new Tshirt('M', 'red');
        $scope.addItem = function (item) {
            Magaz.addItemToOrder(item);
        };
        $scope.tshirts = [];
        Magaz.getAllItems().then(function (_items) {
            $scope.tshirts = _items;
        });
    }]);