var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var botRouter = require('./routes/bot');
var accountRouter = require('./routes/account');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bot', botRouter);
app.use('/account', accountRouter);

// const symbols = require('./bot/symbols')
// symbols.symbolsBinance().then((res)=>{
//     console.table(res)
// })



// bot.trending().then(res => {
//     console.table(res);
// })
// .catch(err => {
//     console.error(err)
// });
    

// var tulind = require('tulind');
// console.log("Tulip Indicators version is:");
// console.log(tulind.version);
// console.log(tulind.indicators.macd);
// console.log(tulind.indicators.rsi);



module.exports = app;