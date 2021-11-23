require('dotenv').config();
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


// 43 'best' pairs
let pairs  = [
    'BTCUSDT','ETHUSDT','BNBUSDT','SOLUSDT','ADAUSDT','XRPUSDT','DOTUSDT',
    'LUNAUSDT','AVAXUSDT','LINKUSDT','LTCUSDT','UNIUSDT','MATICUSDT','ALGOUSDT','BCHUSDT',
    'VETUSDT','ATOMUSDT','AXSUSDT','ICPUSDT','XLMUSDT','FTTBUSD','FTMUSDT','TRXUSDT','THETAUSDT',
    'FILUSDT','ETCUSDT','HBARUSDT','EGLDUSDT','NEARUSDT','XTZUSDT','GRTUSDT','XMRUSDT','EOSUSDT',
    'AAVEUSDT','KSMUSDT','HNTUSDT','KLAYUSDT','RUNEUSDT','ARUSDT','MANAUSDT','1000SHIBUSDT','DOGEUSDT','SANDUSDT'
]

const bot = require('./bot/trending')

console.log('Iniciando bot...')
setInterval(async () => {
    bot.runBot(process.env.QUANTITY, 1, pairs, '15m', 1).then(res => {
    })
    .catch(err => {
        console.error(err)
//        process.exit(1) fecha o programa
    })
}, process.env.CRAWLER_INTERVAL);

// to get only rsi 
setInterval(async () => {
    bot.runBot(process.env.QUANTITY, 1, pairs, '1h', 0).then(res => {
    })
    .catch(err => {
        console.error(err)
//        process.exit(1) fecha o programa
    })
}, process.env.CRAWLER_INTERVAL * 1.5);

// require('dotenv').config();
// const TelegramBot = require('node-telegram-bot-api');
// const telegramBot = new TelegramBot(process.env.TELEGRAN_BOT, {polling: true});

// telegramBot.sendMessage(process.env.GROUP_CHAT_ID, 'hello fuckers')


// const symbols = require('./bot/symbols')
// symbols.symbolsBinance().then((res)=>{
//     console.table(res)
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