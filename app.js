/**
 * Module dependencies.
 */


var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');
//===     morgan = require('morgan'),

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/expApp2');


var app = module.exports = express();

// Configuration

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);
//to serve out HTML, there is no need to use a view engine at all, unless you want to set up funky routing. Instead, just use the static middleware:
//    app.use(express.static(__dirname + '/public'));

//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
//app.use(express.static(__dirname + '/app'));
app.use(express.static(path.join(__dirname, 'app')));


//app.use(app.router);

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});



var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    app.use(errorHandler());
}


// production only
if (env === 'production') {
    // TODO
}
// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials); //must for applying templates

// JSON API
/*
app.get('/api/posts', api.posts);
app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);
*/
app.get('/api/getphones', api.getphones);
app.get('/api/posts', api.posts);
app.get('/api/test2', api.test2);
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

http.createServer(app).listen(app.get('port'), function () {
 console.log('Express server listening on port ' + app.get('port'));
 });
