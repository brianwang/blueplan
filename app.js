var cluster = require('cluster');
var express = require('express');
var numCPUs = require('os').cpus().length;
var redis = require('redis');

if (cluster.isMaster) {
    require('os').cpus().forEach(function() {
        cluster.fork();
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
    cluster.on('listening', function(worker, address) {
        console.log("A worker with #" + worker.id + " is now connected to " +
                address.address +
                ":" + address.port);
    });
} else {
	function clientErrorHandler(err, req, res, next) {
		if (req.xhr) {
		    res.send(500, { error: 'Something blew up!' });
		  } else {
		    next(err);
		  }
	}
	function errorHandler(err, req, res, next) {
		  res.status(500);
		  res.render('error', { error: err });
	}
	var app = express();
	var db = redis.createClient();
	app.use(express.static(__dirname + '/assets'));
	app.use(express.logger());
	app.use(clientErrorHandler);
	app.use(errorHandler);
	
	app.use(function(req, res, next){
		  var ua = req.headers['user-agent'];
		  db.zadd('online', Date.now(), ua, next);
	});
	app.get('/hello.txt', function(req, res){
	  var body = 'Hello World';
	  res.setHeader('Content-Type', 'text/plain');
	  res.setHeader('Content-Length', Buffer.byteLength(body));
	  res.end(body);
	});
	app.get('/',function(req,res){
		res.setHeader('Content-Type', 'text/plain');
        res.send('hello,world');
		res.end();
	});
	app.listen(8000);
	console.log('Listening on port 8000');
}
