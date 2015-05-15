'use strict';

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var mysql = require('mysql');
var express = require('express');
var path = require('path');
var jade = require('jade');
var app = express();


//if (cluster.isMaster) {
//    // Fork workers.
//    for (var i = 0; i < 1; i++) {
//        cluster.fork();
//    }
//
//    cluster.on('exit', function(worker, code, signal) {
//        console.log('worker ' + worker.process.pid + ' died');
//    });
//} else {
    (function () {
        app.set('view engine', 'jade');
        app.set('views', path.normalize(__dirname + '/public'));

        var pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            port: 3306,
            password: '!QAZ2wsx',
            database: 'infiniti',
            trace: false
        });

        var indexJadeTmp = jade.compileFile('./public/index.jade');

        function extractItems(cb) {

            var date = new Date();
            pool.getConnection(function(err, connection) {
                console.log(new Date() - date);
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
    })();
//}