var express = require('express');
var router = express.Router();

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