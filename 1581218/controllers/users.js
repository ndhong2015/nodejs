var controller = {};

var models = require('../models');
var bcrypt = require('bcryptjs');

controller.createUser = function(user, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            models.User
                .create(user)
                .then(function() {
                    callback(err);
                });
        });
    });
};

controller.getUserByEmail = function(email, callback) {
    let Obj = { email: email }
    models.User
        .findOne({ where: Obj })
        .then(function(user) {
            callback(user);
        })
        .catch(function(err) {
            if (err) throw err;
            callback(null);
        });
};

controller.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, isMatch) {
        if (err) throw err;
        callback(isMatch);
    });
};

controller.getUserById = function(id, callback) {
    models.User
        .findById(id)
        .then(function(user) {
            callback(false, user);
        });
}

controller.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect(`/users/login?returnURL=${req.originalUrl}`);
    }
};

controller.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.status(403);
        res.end();
    }
};

module.exports = controller;