var express = require('express');
var router = express.Router();

router.get('/', (req, res) => { // function kieu moi
    var cart = req.session.cart;
    res.locals.items = cart.generateArray();
    res.locals.totalPrice = cart.totalPrice();
    
    res.render('cart');
});

var productController = require('../controllers/products');
router.post('/', function(req, res){
    var productId = req.body.id;
    productController.getById(productId, function(product){
        req.session.cart.add(product, product.id);
        res.sendStatus(204);
        res.end();
    });    
});

router.delete('/', function(req, res){
    var productId = req.body.id;
    req.session.cart.remove(productId);
    res.sendStatus(204);
    res.end();
});

router.put('/', function(req, res){
    var productId = req.body.id;
    var quantity = parseInt(req.body.quantity);
    req.session.cart.update(productId, quantity);
    res.sendStatus(204);
    res.end();
});

router.get('/', function(req, res){
    res.locals.cart = 'active';
    res.locals.checkout = '';
    res.locals.payment = '';
    res.render('cart');
});

router.get('/checkout', function(req, res){
    var cart = req.session.cart;
    res.locals.items = cart.generateArray();
    res.locals.totalPrice = cart.totalPrice();
    
    res.render('users/checkout');
});

// router.post('/shipping', function(req, res){
//     res.locals.cart = 'completed';
//     res.locals.checkout = 'completed';
//     res.locals.payment = 'active';
//     res.render('payment');
//  });

router.post('/checkout/shipping', function(req, res){
    var address = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country
    };

    req.session.cart.address = address;
    
    var cart = req.session.cart;
    res.locals.items = cart.generateArray();
    res.locals.totalPrice = cart.totalPrice();
    res.render('users/payment'); 
});

var orderController = require('../controllers/orders');

router.post('/checkout/payment', function(req, res){
    var paymentMethod = req.body.paymentMethod;

    if (paymentMethod == "COD"){
        req.session.cart.paymentMethod = paymentMethod;
        orderController.saveOrder(req.session.cart, function(){
        res.locals.paymentStatus = "PAYMENT COMPLETE";
        res.locals.paymentMessage = "Your order has been proceed! Thank you.";
        res.render('users/confirm');
        })     
    } else {
        res.locals.paymentStatus = "SORRY";
        res.locals.paymentMessage = "Sorry.";
        res.render('users/confirm');
    }
});
 
 
module.exports = router;