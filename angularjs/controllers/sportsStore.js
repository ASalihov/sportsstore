angular.module('sportsStore')
    .constant("dataUrl", "http://localhost:5500/products")
    .constant("orderUrl", "http://localhost:5500/orders")
    .controller('sportsStoreCtrl', function ($scope, $http, $location, dataUrl, orderUrl, cart) {
        $scope.data = {};
        $http.get(dataUrl)
            .then(
                function(success){
                    $scope.data.products = success.data
                },  
                function(error){
                    $scope.data.error = error.data
                }
            );

        $scope.sendOrder = function(shippingDetails){
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .then(
                    function(success){
                        $scope.data.orderId = success.data.id;
                        cart.getProducts().length = 0;
                    },
                    function(error){
                        $scope.data.orderError = error
                    }
                )
                .finally(
                    function(){
                        $location.path("/complete");
                    }
                )
        }
    });