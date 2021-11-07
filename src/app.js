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
    
    
// const api = require('./integration/apiBinance')
// const bot = require('./bot/trending')
// bot.runBot(5, 1, [], '1h').then(res => {
//     console.log(res);
// })
// .catch(err => {
//     console.error(err)
// }).finally(()=>{
//     process.exit(1)
// })
    

// var tulind = require('tulind');
// console.log("Tulip Indicators version is:");
// console.log(tulind.version);
// console.log(tulind.indicators.macd);
// console.log(tulind.indicators.stoch);

/* socket */
// const Websocket = require('ws');
// const ws =  new Websocket('wss://stream.binance.com:9443/ws/!bookTicker');

// const _symbol = 'DARUSDT'
// let filled = false
// let amount = 20 // quantia que vai investir em dolar
// let pricePrecision = 2 // casas decimais do token

// ws.onmessage = async (e) => {
//     const obg = JSON.parse(e.data)
//     let quantity = null
//     if(obg.s === _symbol) {
//         console.log('Preço de compra praticado: ',obg.b)
//         quantity = parseFloat((amount / obg.b).toFixed(pricePrecision))
//         if(!filled) {
//             filled = true
//             console.log(`Comprando o token: ${_symbol}, quantidade: ${quantity}, foi gasto: ${amount} dol`)
//             try {
//                 const buyOrder = await api.newOrder(_symbol, quantity)
//                 console.log(buyOrder)
//             } catch (error) {
//                 console.error(error)
//             } finally {
//                 process.exit(1)
//             }
//         }
//     } else {
//         console.log('Símbolo nao encontrado!', new Date().toISOString())
//     }
// }
module.exports = app;