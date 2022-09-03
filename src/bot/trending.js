require('dotenv').config();
const api = require('../integration/apiBinance')
const indicators = require('../indicators')
const _symbols = require('./symbols')
const profit = process.env.PROFIT;
const quantity = process.env.QUANTITY;
// const TelegramBot = require('node-telegram-bot-api');
// const telegramBot = new TelegramBot(process.env.TELEGRAN_BOT, {polling: true});


const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

const util = require('util');
client.get = util.promisify(client.get);
// client.del('currentOrder')


async function runBot(orderSize=5, maxOrders=1, symbols=[], interval='5m', mode=1){
    let currentOrder = null, assetToTrade = null, asset =null, side=null, stop=null, profit=null, assets=[], orders=[], res=[], currentOrderState ={}
    
    orders = JSON.parse(await client.get('orders')) || []
    currentOrder = JSON.parse(await client.get('currentOrder'))

    if (currentOrder){
        currentOrderState = (await trending(interval, 100, [currentOrder['asset']]))[0]

        if(currentOrder['side'] == 'BUY'){
            if (currentOrderState['close'] >= currentOrder['profit']){
                currentOrder['finished'] = true
                currentOrder['success'] = true
            } else if(currentOrderState['close'] <= currentOrder['stop']){
                currentOrder['finished'] = true
                currentOrder['success'] = false
            }
        } else {
            if (currentOrderState['close'] >= currentOrder['stop']){
                currentOrder['finished'] = true
                currentOrder['success'] = false
            } else if(currentOrderState['close'] <= currentOrder['profit']){
                currentOrder['finished'] = true
                currentOrder['success'] = true
            }
        }

        if(currentOrder['finished']){
            console.log('Order finished')
            console.log('---------------------------------------------------------------------------------------------')
            orders.push(currentOrder)
            client.del('currentOrder')
            client.set('orders', JSON.stringify(orders));
            // process.exit(1) 
        } else {
            console.log(JSON.stringify(currentOrder)+'\n Ainda esta pendente: valor atual: '+currentOrderState['close'])
        }

 
    } else {

        assets = await trending(interval, 100, symbols)
        
        res = await momentum(assets, mode)
        if (res.long.length || res.short.length){
            
            await sendAlert(res, interval) 
            
            if(res.long.length) {
                assetToTrade = res.long[0] // improve the select
                side = 'BUY'
            } else {
                assetToTrade = res.short[0] // improve the select
                side = 'SELL'
            }
            currentOrder = {
                'asset':assetToTrade.symbol, 'close':assetToTrade.close, 'side':side,'finished':false
            }
            asset = _symbols.symbolsDefault.find((a) => a.symbol == assetToTrade.symbol);
            // let _quantity = 20 * process.env.QUANTITY// 20x Leverage
            currentOrder['quantity'] = parseFloat((20 * process.env.QUANTITY / assetToTrade.close).toFixed(asset.quantityPrecision))
            
            if(side == 'BUY'){
                currentOrder['profit'] = parseFloat((assetToTrade.close*process.env.PROFIT).toFixed((asset.pricePrecision)-1))
                currentOrder['stop'] = parseFloat((assetToTrade.close*process.env.STOP_LOSS).toFixed((asset.pricePrecision)-1))
            } else {
                currentOrder['stop'] = parseFloat((assetToTrade.close*process.env.PROFIT).toFixed((asset.pricePrecision)-1))
                currentOrder['profit'] = parseFloat((assetToTrade.close*process.env.STOP_LOSS).toFixed((asset.pricePrecision)-1))
            }
            client.set('currentOrder', JSON.stringify(currentOrder));
            
            // to buy position
            // asset = assets[0]
            // let res = await strategyNew(asset.symbol, asset.close, asset.stop, orderSize)
            // orders.push(res.profitOrder)
            // console.log(asset, res)
            // TODO short position
        } else {
            console.log(`Nenhum asset no momento (${mode}) `, (new Date()).toISOString())
        }
    }
}

async function trending(interval='5m', periods=100, symbols=[]) {
    let result = []
    if(!symbols.length) symbols = _symbols.symbolsDefault.map((s) => (s.symbol));
    console.log('Iniciando a busca em '+symbols.length+' ativos, '+interval+', '+periods+' períodos.')
    for (let i = 0; i < symbols.length; i++) {
        let res = await api.klines(symbols[i], interval, periods)
        let high = res.map(d => d[2])
        let low = res.map(d => d[3])
        let close = res.map(d => d[4])
        let _data = {'symbol':symbols[i], 'close':close[close.length - 1]}
        
        // Add indicators here
        let rsi = await indicators.rsi(close)
        _data[`rsi`] = parseFloat((rsi).toFixed(2))
        let macd = await indicators.macd(close)
        _data['macd'] = [parseFloat((macd[0]).toFixed(2)), parseFloat((macd[1]).toFixed(2))]
        let stoch = await indicators.stoch(high, low, close)
        _data[`stoch`] = [parseFloat((stoch[0]).toFixed(2)), parseFloat((stoch[1]).toFixed(2))]
        
        result.push(_data)
    }
    return result.sort((a, b) => a[`macd`][0] - b[`macd`][0] || a[`rsi`] - b[`rsi`]);
}

// Change this function to check the perfect entry price
async function momentum(assets, mode){
    let long = [], short = []
    if(mode == 1){
        assets.forEach((a) => {
            if(a.rsi >= 50 && (a.stoch[0] <= 50 && a.stoch[1] <= 50 && a.stoch[0] >= 30 && a.stoch[1] >= 30)){
                //console.log('long: ', a.symbol, a.rsi, a.stoch[0], a.stoch[1],a.macd[0], a.macd[1])
                if(a.macd[0] > a.macd[1]) long.push(a)
            } else if (a.rsi <= 50 && (a.stoch[0] <= 70 && a.stoch[1] <= 70 && a.stoch[0] >= 50 && a.stoch[1] >= 50)){
                //console.log('short ', a.symbol, a.rsi, a.stoch[0], a.stoch[1],a.macd[0], a.macd[1])
                if(a.macd[0] < a.macd[1]) short.push(a)
            }
        })
    } else {
        assets.forEach((a) => {
            if(a.rsi >= 1){
                console.log('short ', a.symbol, a.rsi, a.stoch[0], a.stoch[1],a.macd[0], a.macd[1])
                short.push(a)
            } else if (a.rsi <= 99){
                console.log('long: ', a.symbol, a.rsi, a.stoch[0], a.stoch[1],a.macd[0], a.macd[1])
                long.push(a)
            }
        })
    }

    return {long, short}
}

// TODO make short positions
async function strategyNew(symbol, price, stopPrice=null, _quantity=null, type='BUY') {

    // TODO, check balance first
    let _while = 1
    let asset = _symbols.symbolsDefault.find((a) => a.symbol == symbol);
    let newOrder, newOrder, profitOrder, stopOrder, priceFilled, sellPrice;
    
    if (!_quantity) _quantity = quantity
    _quantity = 20 *_quantity // 20x Leverage
    try {
        

        _quantity = parseFloat((_quantity / price).toFixed(asset.quantityPrecision))

        console.info(`Quantity ${_quantity}`)

        newOrder = await api.newOrder(symbol, _quantity)
        if(!newOrder.orderId)
            throw "The new order was no created correctly"

        while (_while) {
            newOrder = await api.queryOrder(symbol, newOrder.orderId)
            if (newOrder.status === 'FILLED' || (newOrder.status !== 'NEW' && newOrder.status !== 'PARTIALLY_FILLED')) _while = 0
        }
        if(newOrder.fills && newOrder.fills.length)
            priceFilled = newOrder.fills[0].price; // SPOT, TODO, take the avg between fills
        else
            priceFilled = newOrder.avgPrice // FUTURE

        console.info(`Price filled: ${priceFilled}`)
        
        sellPrice = parseFloat((priceFilled*profit).toFixed((asset.pricePrecision)-1))

        if (newOrder && newOrder.status === 'FILLED' && priceFilled)
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
    return {newOrder, newOrder, profitOrder, stopOrder}
}

async function sendAlert(assets, interval){
    let msgShort = '', msgLong = ''

    if(assets.long.length){
        msgLong = `Ativos para long(${interval})\n`
        assets.long.forEach((a) =>{
            msgLong += `${a.symbol}, ${a.close}, rsi:${(a.rsi).toFixed(1)}, macd:${(a.macd[0]).toFixed(2)}\n`
        })
    }
    if(assets.short.length){
        msgShort = `Ativos para short(${interval})\n`
        assets.short.forEach((a) =>{
            msgShort += `${a.symbol}, ${a.close}, rsi:${(a.rsi).toFixed(1)}, macd:${(a.macd[0]).toFixed(2)}\n`
        })
    }
    
    // console.log(assets.long.length, assets.short.length)
    console.log(msgLong, msgShort)
    // telegramBot.sendMessage(process.env.GROUP_CHAT_ID, msgLong + msgShort)
}

module.exports = { trending, strategyNew, runBot };
