var cluster = require('cluster');
var express = require('express');
var numCPUs = require('os').cpus().length;
var redis = require('redis');
//if (cluster.isMaster) {
//    require('os').cpus().forEach(function() {
//        cluster.fork();
//    });
//    cluster.on('exit', function(worker, code, signal) {
//        console.log('worker ' + worker.process.pid + ' died');
//    });
//    cluster.on('listening', function(worker, address) {
//        console.log("A worker with #" + worker.id + " is now connected to " +
//                address.address +
//                ":" + address.port);
//    });
//} else {
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.send(500, {error: 'Something blew up!'});
    } else {
        next(err);
    }
}
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {error: err});
}

function auth(usename, token) {
    return true;
}
var app = express();
app.configure(function() {
    app.use(express.static(__dirname + '/assets'));
    app.use(express.logger());
    app.use(clientErrorHandler);
    app.use(errorHandler);
    app.locals({
        title: '蓝图网',
        phone: '1-250-858-9990',
        email: 'wangxydlut@gmail.com'
    });
    app.all('/api/*', auth);
    //app.param('id',/^\d+$/);

    app.use(function(req, res, next) {
        var ua = req.headers['user-agent'];
        db.zadd('online', Date.now(), ua, next);
        console.log('%s %s', req.method, req.url);
        //next();
    });
});
app.set('view engine', 'html');
app.engine('html', require('swig').renderFile);
var db = redis.createClient();
// development only
app.configure('development', function() {
    //app.set('db', 'localhost');
});
app.get('/', function(req, res) {
    var data = {};
    res.render('index', data);
});

app.get('/project', function(req, res) {
    var data = {};
    res.render('project', data);
});
app.get('/about', function(req, res) {
    var data = {};
    res.render('about', data);
});

app.get('/canvas', function(req, res) {
    var data = {};
    res.render('canvas', data);
});
app.post('/plan/create', function(req, res) {
    var result = {reuslt: 'ok'};
    res.send(JSON.stringify(result));
});
app.post('/plan/item/add',function(req,res){
    var params =req.params;
    if(params.hasOwnProperty('pid')
       && params.hasOwnProperty('text')
       && params.hasOwnProperty('sid')){
        
        
    }else{
        res.send({result: 'params is not available!'});
    }
});
app.get('/plan/:id', function(req, res) {
    res.end('plan is plan');
});
//update some plan
app.post('/plan/update/:id', function(req, res) {


});
app.post('/plan/delete/(\d+)', function(req, res) {


});
app.listen(8000);
console.log('Listening on port 8000');
//}
