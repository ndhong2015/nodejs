var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');

router.get('/login', (req, res) => {
    req.session.returnURL = req.query.returnURL;
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/admin', userController.isAdmin, (req, res) => {
    res.render('users/admin');
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    userController.getUserByEmail(email, function(user) {
        if (!user) {
            res.render('login', { error: 'No email is found' });
        } else {
            userController.comparePassword(password, user.password, function(isMatch) {
                if (!isMatch) {
                    res.render('login', { error: 'Incorrect Password' });
                } else {
                    req.session.user = user;
                    if (req.session.returnURL) {
                        res.redirect(req.session.returnURL);
                    } else {
                        if (user.isAdmin === true) {
                            res.redirect('/users/admin');
                        } else {
                            res.redirect('/');
                        }
                    }
                }
            });
        }
    });
});

router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm = req.body.confirm;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Please enter a valid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm', 'Confirm Password is required').notEmpty();
    req.checkBody('confirm', 'Confirm Password must match wirh Password').equals(password);

    var errors = req.validationErrors();
    if (errors) {
        res.render('register', { errors: errors });
    } else {
        userController.getUserByEmail(email, function(user) {
            if (user) {
                res.render('register', { error: `Email ${email} exists! Please choose another email.` });
            } else {
                var user = {
                    name: name,
                    email: email,
                    password: password,
                    isAdmin: false
                };
                userController.createUser(user, function(err) {
                    if (err) throw err;
                    res.render('login', { error: 'You have registered, now please login' });
                });
            }
        });
    }
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/users/login');
});

var ordersController = require('../controllers/orders');
router.get('/orders', userController.isLoggedIn, function(req, res) {
    var user = req.session.user;
    ordersController.getByUser(user, (orders) => {
        res.locals.orders = orders;
        res.render('users/orderhistory');
    });
});

router.get('/orders/:id', userController.isLoggedIn, function(req, res) {
    var id = req.params.id;
    ordersController.getById(id, (order) => {
        res.locals.order = order;
        ordersController.getDetailsByOrderId(id, (details) => {
            res.locals.details = details;
            res.render('users/orderdetails');
        });
    });
});

module.exports = router;