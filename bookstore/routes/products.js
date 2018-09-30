var express = require('express');
var router = express.Router();

var controller = require('../controllers/products');

router.get('/', (req, res) => {
    controller.getAll(function(products){
        res.locals.products = products;
        res.render('index');
        console.log(products);
    });
});

router.get('/:id', (req, res) => {
   var id = req.params.id;
   controller.getById(id, function(product){
    var page = parseInt(req.query.page);
    page = isNaN(page) ? 1: page;
    var limit = 2;
    var pagination = {
        limit: limit,
        page: page,
        totalRows: product.Comments.length
    };
    var offset = (page-1)*limit;
    product.Comments = product.Comments.sort(function(a, b){
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    }).slice(offset, offset + limit);
    
    res.locals.hasPagination = (pagination.totalRows/limit > 1);
    res.locals.pagination = pagination;
    res.locals.product = product;
    res.render('details');
   });
});
module.exports = router;