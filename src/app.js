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
const indicators = require('./indicators')
const symbol = process.env.SYMBOL;
const interval = process.env.CRAWLER_INTERVAL
const bot = require('./bot/trending')

setInterval(async () => {
    // console.warn(`\n--------------------------------------------------`);
    // console.log(`Período de verificação: ${interval/1000} segundos.`);
    // const account = await api.accountInfo()
    // const coins = account.balances.filter(b => symbol.indexOf(b.asset) !== -1)

    // console.warn('Posição da carteira:')
    // console.table(coins)

    // console.log(`Valor do par ${symbol}: ${depth.asks[0][0]}`);

    // let newOrder = await api.newOrder(symbol,1,price=null,side='SELL')
    // console.log(newOrder)
    // if(parseInt(coins.find(c => c.asset === 'USDT').free)){
        //     let newOrder = await api.newOrder(symbol,1)
        //     console.log(newOrder)
        // }

}, interval)

bot.trending().then(res => {
    console.table(res);
})
.catch(err => {
    console.error(err)
});
    
module.exports = app;




