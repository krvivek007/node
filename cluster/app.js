var cluster = require('cluster');
if(cluster.isMaster){
	var cpuCount = require('os').cpus().length;
	for(var i=0; i< cpuCount; i++){
		cluster.fork();
	}
	cluster.on('exit', function(worker){
		console.log("Worker:" + worker.id + "Died!")
		cluster.fork();
	})

}else{
	// Include Express
	var express = require('express');
	// Create a new Express application
	var app = express();
	// Add a basic route – index page
	app.get('/', function (req, res) {
    res.send('Hello World! from:' + cluster.worker.id);
	});

	// Bind to a port
	app.listen(3000);
	console.log('Application running!');
}