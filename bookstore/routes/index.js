var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.redirect('/products');
});

var productController = require('../controllers/products');
router.get('/search', function(req, res){
   var query = req.query.query;
   productController.search(query, function(products){
       res.locals.products = products;
       res.locals.count = products.length;
       res.locals.query = query;
       res.render('search');
   });
});

//Create database 
// var models = require('../models');
// router.get('/sync', function(req, res){
// 	models.sequelize.sync().then(function(){
// 		res.send('database sync completed!');
// 	});
// });

module.exports = router;

