var controller ={};

var models = require('../models');

// CSDL
// Address
// OrderDetails
controller.saveOrder = function(cart, callback){
    models.Address
        .create(cart.address)
        .then(function(newAddress){
            var order = {
                totalQuantity: cart.totalQuantity(),
                totalPrice: cart.totalPrice(),
                paymentMethod: cart.paymentMethod,
                status: "Processing",
                AddressId: newAddress.id
            };
            
            models.Order
                .create(order)
                .then(function(newOrder){
                    var items = cart.generateArray();
                    items.forEach(function(item){
                        var detail = {
                            price: item.price,
                            quantity: item.quantity,
                            ProductId: item.item.id,
                            OrderId: newOrder.id
                        };
                        models.OrderDetail
                            .create(detail);
                    });
                    //Empty cart
                    cart.empty();
                    callback();
                });
        });
};
module.exports = controller;