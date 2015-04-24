'use strict';

var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '!QAZ2wsx',
    database: 'infiniti'
});

function extractItems(cb) {
    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query( 'SELECT TitleName FROM Title', function(err, rows) {
            cb(err, rows);
            // And done with the connection.
            connection.release();
        });
    });
}



var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    extractItems(function (err, rows) {
        var html = ['<ul>'];
        rows.forEach(function (r) {
            html.push('<li>', r.TitleName, '</li>');
        });
        html.push('</ul>');
        res.end(html.join(''), 'utf-8');
    });
});

server.listen(3004);
console.log("Server is listening");