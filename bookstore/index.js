var express = require('express');
var app = express();
//Setting for app here
const morgan = require('morgan');
app.use(morgan('dev', {
    skip: function(req, res){
        return res.statusCode < 400;

    },
    stream: process.stderr
}));
app.use(morgan('dev',{
    skip: function(req, res){
        return res.statusCode >= 400;
    },
    stream: process.stdout
}));

//Set Public Folder
app.use(express.static(__dirname + '/public'));

// Use View Engine
function formatDate(date){
    return date.toLocaleString('en-US');
}

var expressHbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
var hbs = expressHbs.create({
    extname : 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers:{
        paginate: paginateHelper.createPagination,
        formatDate: formatDate
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Define your routes here
 var indexRouter = require('./routes/index');
 app.use('/', indexRouter);

 var productRouter = require('./routes/products');
 app.use('/products', productRouter);

/*
Route xu ly cho cac thao tac Them, Sua, Xoa comments

POST    /comments {comment, ProductId}
PUT     /comments/:id  {comment}
DELETE  /comments//:id

*/
var commentRouter = require('./routes/comments');
app.use('/comments', commentRouter);

var userRouter = require('./routes/users');
app.use('/users',userRouter);

var cartRouter = require('./routes/cart');
app.use('/cart', cartRouter);

app.get('/test', function(req, res){
    console.log(req.locals.message);
})
app.get('/favicon.ico', (req, res) => res.status(204));
// Error Handler
// Handle 404 Not Found
app.use(function(req, res){
    res.locals.message = "Request Not Found";
    res.status(400).render('error');
});

// Handle 500 Internal Server Error
app.use(function(err, req, res, next){
    res.locals.message = "Internal Server Error";
    console.log(err);
    res.status(500).render('error');
});

// Set Server Port & start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
    console.log('Server is listening at port ' + app.get('port'));
})