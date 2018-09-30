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
    res.locals.cart = 'completed';
    res.locals.checkout = 'active';
    res.locals.payment = '';
   res.render('checkout');
});

router.post('/shipping', function(req, res){
    res.locals.cart = 'completed';
    res.locals.checkout = 'completed';
    res.locals.payment = 'active';
    res.render('payment');
 });

 router.post('/payment', function(req, res){
    res.render('confirm');
 });
 
 
module.exports = router;