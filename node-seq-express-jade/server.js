'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize('infiniti', 'root', '!QAZ2wsx', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    pool: {
        maxConnections: 5,
        maxIdleTime: 30
    },
    define: {
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        syncOnAssociation: false
    }
});

var Title = sequelize.define('Title', {
    TitleID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    TitleName: Sequelize.STRING
});

var express = require('express');
var path = require('path');
var jade = require('jade');
var app = express();

app.set('view engine', 'jade');
app.set('views', path.normalize(__dirname + '/public'));

var indexJadeTmp = jade.compileFile('./public/index.jade');

function extractItems() {
    return Title.findAll();
}

app.get('/', function (req, res) {
    extractItems().then(function (items) {
        res.render('index', {items: items});
    });
});

app.get('/compile', function (req, res) {
    extractItems().then(function (items) {
        res.send(indexJadeTmp({items: items}));
    });
});

app.listen(3006);
console.log('app is running and listening 3006');