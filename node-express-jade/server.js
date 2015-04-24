'use strict';

var express = require('express');
var path = require('path');
var jade = require('jade');

var indexJadeTmp = jade.compileFile('./public/index.jade');

var app = express();

app.set('view engine', 'jade');
app.set('views', path.normalize(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/compile', function(req, res) {
    res.send(indexJadeTmp());
});

app.listen(3003);
console.log('app is running and listening 3003');