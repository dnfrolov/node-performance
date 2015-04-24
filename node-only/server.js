'use strict';

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./public/index.html', function (err, content) {
        res.end(content, 'utf-8');
    });
});

server.listen(3001);
console.log("Server is listening");