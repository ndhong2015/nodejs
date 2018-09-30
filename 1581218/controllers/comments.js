var controller ={};
var models = require('../models');
var Comments = models.Comment;

controller.add = function(comment, callback){
    Comments
    .create(comment)
    .then(callback);
};

controller.update = function(comment, callback){
    Comments
    .update({
        comment: comment.comment
    },{
        where: {id: comment.id}
    })
    .then(callback);
};

controller.delete = function(id, callback){
    Comments
    .destroy({
        where: {id: id}
    })
    .then(callback);
};

module.exports = controller;