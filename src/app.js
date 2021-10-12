var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('dotenv').config();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//
const api = require('./integration/apiBinance')

setInterval(async () => {
    // console.log('teste',process.env.CRAWLER_INTERVAL);
    // console.log('Binance api',await api.time());
    console.log('Binance api',await api.depth('ETHUSDT'));

}, process.env.CRAWLER_INTERVAL)

//

module.exports = app;
