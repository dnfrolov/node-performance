'use strict';

var mysql = require('mysql');
var express = require('express');
var path = require('path');
var jade = require('jade');
var app = express();

app.set('view engine', 'jade');
app.set('views', path.normalize(__dirname + '/public'));

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '!QAZ2wsx',
    database: 'infiniti'
});

var indexJadeTmp = jade.compileFile('./public/index.jade');

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

app.get('/', function (req, res) {
    extractItems(function (err, items) {
        res.render('index', {items: items});
    });
});

app.get('/compile', function (req, res) {
    extractItems(function (err, items) {
        res.send(indexJadeTmp({items: items}));
    })
});

app.listen(3005);
console.log('app is running and listening 3005');