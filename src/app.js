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
const symbol = process.env.SYMBOL;
setInterval(async () => {
    // console.log('teste',process.env.CRAWLER_INTERVAL);
    console.log('Binance api', (await api.exchangeInfo()).serverTime);
    // console.log('Binance api',await api.time());
    const account = await api.accountInfo()
    const coins = account.balances.filter(b => symbol.indexOf(b.asset) !== -1)
    console.log('POSIÇÃO DA CARTEIRA')
    console.log(coins)

    // console.log('Binance api',await api.depth(symbol,limit=2));
    // var x = new Date()
    // var UTCseconds = (x.getTime());
    // console.log("UTCseconds", Math.floor(UTCseconds))
    if(parseInt(coins.find(c => c.asset === 'USDT').free)){
        // let newOrder = await api.newOrder(symbol,1)
        let newOrder = await api.newOrder(symbol,1)
        console.log(newOrder)
    }
}, process.env.CRAWLER_INTERVAL)

// console.log(Math.floor((new Date()).getTime() / 1000))
// console.log(Date.now())
// console.log((new Date()).getTime())
// var x = new Date()
// var UTCseconds = (x.getTime() + x.getTimezoneOffset()*60*1000)/1000;

// console.log("UTCseconds", Math.floor(UTCseconds))

// 1634065114710
// 1634059654114
module.exports = app;
