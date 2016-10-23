angular.module('magaz', [])
    .service('Magaz', ['$http', '$q', 'Tshirt','Order', function ($http, $q, Tshirt, Order) {
        var orders = [];
        var items = [];

        function Magaz() {
            console.log('constructor');
        }

        Magaz.prototype.getOrders = function () {
            return orders;
        };
        Magaz.prototype.addItemToOrder = function (item) {
            if(!orders.length){
                this.addOrder(new Order());
            }
            orders[0].addItem(item);
        };
        Magaz.prototype.addOrder = function (order) {
            return orders.push(order);
        };
        Magaz.prototype.getAllItems = function () {
            if (items.length) {
                return $q(function (resolve, reject) {
                    resolve(items);
                });
            }
            return $http({
                method: 'GET',
                url: '/data/tshirts.json'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                items = response.data;
                return items.map(function (item) {
                    return new Tshirt(item.brand, item.size, item.color, item.price);
                });
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error(response);
            });
        };

        return new Magaz();
    }])
    .factory('Tshirt', [function () {
        function Tshirt(brand, size, color, price) {
            this.brand = brand;
            this.size = size;
            this.color = color;
            this.price = price;
        }

        return Tshirt;
    }])
    .factory('Order', [function () {
        function Order() {
            this.items = [];
            this.customer = 'Vasia';
            this.totalPrice = 0;
        }

        Order.prototype.addItem = function(item){
          this.items.push(item);
        };

        Order.prototype.getTotalPrice = function () {
            return this.items.reduce(function (total, item) {
                return total + item.price;
            }, this.totalPrice);
        };


        return Order;
    }]);