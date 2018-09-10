var express = require('express');
var path = require('path');
var app = express();
var port = 3000;

app.use(express.static(path.join(__dirname, 'static')))

app.listen(port, function() {
	console.log('You may now request the application: http://localhost:%d/', port);
});