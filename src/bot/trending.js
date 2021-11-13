require('dotenv').config();
const api = require('../integration/apiBinance')
const indicators = require('../indicators')
const _symbols = require('./symbols')
const profit = process.env.PROFIT;
const quantity = process.env.QUANTITY;
const TelegramBot = require('node-telegram-bot-api');
const telegramBot = new TelegramBot(process.env.TELEGRAN_BOT, {polling: true});

async function trending(interval='5m', periods=100, symbols=[]) {
    let result = []
    let rsiBase =  31
    if(!symbols.length) symbols = _symbols.symbolsDefault.map((s) => (s.symbol));
    console.log('Iniciando a busca em '+symbols.length+' ativos (rsi < '+rsiBase+' ou rsi > 80), '+interval+', '+periods+' períodos.')
    let loading = ''
    for (let i = 0; i < symbols.length; i++) {
        let res = await api.klines(symbols[i], interval, periods)
        let high = res.map(d => d[2])
        let low = res.map(d => d[3])
        let close = res.map(d => d[4])
        let stoch = await indicators.stoch(high, low, close)
        let rsi = await indicators.rsi(close)
        let macd = await indicators.macd(close)
        // console.warn(`${symbols[i]}, RSI: ${rsi}, periods: ${close.length} close: ${close[close.length - 1]}, macd:${macd}, stoch: ${stoch}`)
        // if((rsi < 35 && macd > 0 && (stoch[0] > 20 && stoch[0] < 80) && (stoch[1] > 20 && stoch[1] < 80)) || symbols.length == 1){
            if((rsi < rsiBase || rsi > 82) || symbols.length == 1){
            let _data = {'symbol':symbols[i],'macd':parseFloat((macd).toFixed(2))}
            _data[`rsi`] = parseFloat((rsi).toFixed(2))
            _data[`stoch)`] = [parseFloat((stoch[0]).toFixed(2)),parseFloat((stoch[1]).toFixed(2))]
            _data['close'] = close[close.length - 1],
            _data[`Sugested sell`] = close[close.length - 1] * 1.01 // 1.0%
            _data[`stop`] = close[close.length - 1] * 0.97 // -3%
            result.push(_data)
        }
    }
    return result.sort((a, b) => a[`rsi`] - b[`rsi`]);
}

async function strategyNew(symbol, price, stopPrice=null, _quantity=null) {

    // TODO, check balance first
    let _while = 1
    let asset = _symbols.symbolsDefault.find((a) => a.symbol == symbol);
    let newOrder, buyOrder, profitOrder, stopOrder, priceFilled, sellPrice;
    
    if (!_quantity) _quantity = quantity
    _quantity = 20 *_quantity // 20x Leverage
    try {
        

        _quantity = parseFloat((_quantity / price).toFixed(asset.quantityPrecision))

        console.info(`Quantity ${_quantity}`)
        newOrder = await api.newOrder(symbol, _quantity)
        if(!newOrder.orderId)
            throw "The new order was no created correctly"

        while (_while) {
            buyOrder = await api.queryOrder(symbol, newOrder.orderId)
            if (buyOrder.status === 'FILLED' || (buyOrder.status !== 'NEW' && buyOrder.status !== 'PARTIALLY_FILLED')) _while = 0
        }
        if(newOrder.fills && newOrder.fills.length)
            priceFilled = newOrder.fills[0].price; // SPOT, TODO, take the avg between fills
        else
            priceFilled = buyOrder.avgPrice // FUTURE

        console.info(`Price filled: ${priceFilled}`)
        
        sellPrice = parseFloat((priceFilled*profit).toFixed((asset.pricePrecision)-1))

        if (buyOrder && buyOrder.status === 'FILLED' && priceFilled)
            profitOrder = await api.newOrder(symbol, _quantity, null, 'SELL', 'TAKE_PROFIT_MARKET', sellPrice, true)
            if (stopPrice){
                stopPrice = parseFloat((stopPrice).toFixed((asset.pricePrecision)-1))
                stopOrder = await api.newOrder(symbol, _quantity, null, 'SELL', 'STOP_MARKET', stopPrice, true)
            }
        else
            throw "The order not filled correctly"

    
    } catch (error) {
        console.error(error)
        console.log(`Order to buy ${_quantity} on ${symbol} not tottaly completed`)
        
    }
    return {newOrder, buyOrder, profitOrder, stopOrder}
}

async function runBot(orderSize=5, maxOrders=1, symbols=[], period='5m'){
    let assets = await trending(period, 100, symbols)
    let asset = null
    let orders = []
    if (assets.length){
        console.table(assets)
        console.log(`At ${(new Date()).toISOString()}`)
        await sendAlert(assets, period)
        
        // to buy 
        // asset = assets[0]
        // let res = await strategyNew(asset.symbol, asset.close, asset.stop, orderSize)
        // orders.push(res.profitOrder)
        // console.log(asset, res)
    } else {
        console.log('Nenhum asset no momento :( ', (new Date()).toISOString())
    }
}

async function sendAlert(assets, period){
    let msg = `Ativos (${period}):\n`

    assets.forEach((a) =>{
        msg += `**${a.symbol}**, ${a.close}, **rsi:${(a.rsi).toFixed(0)}**, macd:${(a.macd).toFixed(1)}\n `
    })
    // console.log(msg)
    telegramBot.sendMessage(process.env.GROUP_CHAT_ID, msg)
}

module.exports = { trending, strategyNew, runBot };
