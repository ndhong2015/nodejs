var controller ={};
 var models = require('../models');
 var Products = models.Product;

 controller.getAll = function(callback){
    Products
    .findAll()
    .then(function(products){
        products.forEach(function(product){
            product.price = parseFloat(product.price).toFixed(2);
        });
        callback(products);

    });

 };

 controller.getById = function(id, callback){
    Products
    .findOne({
        where: {id: id},
        include: [models.Comment]
    })
    .then(function(product){
        product.price = parseFloat(product.price).toFixed(2);
        callback(product);
    })
 };
// select * from Products
// where Name like '%' + query + '%'
// or Summary like '%' + query + '%'
// or Description like '%' + query + '%'
 controller.search = function(query, callback){
     Products
     .findAll({
         where:{
             $or: [
                 {
                 name: {
                     $like: `%${query}%`
                 }
                },
                {
                summary: {
                    $like: `%${query}%`
                }
                },
                {
                    description: {
                        $like: `%${query}%`
                    }
                }
             ]
         }
     }) 
     .then(function(products){
        products.forEach(function(product){
            product.price = parseFloat(product.price).toFixed(2);
        });
        callback(products);
     });
 };

 module.exports = controller;