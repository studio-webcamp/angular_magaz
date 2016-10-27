angular.module('magaz', [])
    .service('Magaz', ['$http', '$q', 'Tshirt','Order', function ($http, $q, Tshirt, Order) {
        var orders = [];
        var items = [];
        var cities = [];

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
                items = response.data;
                return items.map(function (item) {
                    return new Tshirt(item.sku, item.brand, item.size, item.color, item.price);
                });
            }, function errorCallback(response) {
                console.error(response);
            });
        };

        Magaz.prototype.getCitiesList = function () {
            return $http({
                method: 'GET',
                url: '/data/cities.json'
            }).then(function successCallback(response) {
                cities = response.data;
                return cities;
            }, function errorCallback(response) {
                console.error(response);
            });
        };

        return new Magaz();
    }])
    .factory('Tshirt', [function () {
        function Tshirt(sku, brand, size, color, price) {
            this.sku = sku;
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
            this.totalPrice = 0;
            this.customer = '';
            this.phone = '';
            this.email = '';
            this.city = '';
        }

        Order.prototype.addItem = function(item){
            this.items.push(item);
        };

        Order.prototype.removeItem = function(sku){
            this.items.forEach(function(item, index) {
                if (item.sku == sku) {
                    this.items.splice(index, 1);
                }
            }.bind(this));
        };

        Order.prototype.getTotalPrice = function () {
            return this.items.reduce(function (total, item) {
                return total + item.price;
            }, this.totalPrice);
        };

        Order.prototype.setTotalPrice = function () {
            this.totalPrice = this.getTotalPrice();
        };

        Order.prototype.addCustomer = function(customer){
            this.customer = customer;
        };

        return Order;
    }]);