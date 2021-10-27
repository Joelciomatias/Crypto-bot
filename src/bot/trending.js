const api = require('../integration/apiBinance')
const indicators = require('../indicators')
const _symbols = require('./symbols')
require('dotenv').config();
const profit = process.env.PROFIT;
const quantity = process.env.QUANTITY;

async function trending(interval='5m', periods=200, symbols=[]) {
    let result = []
    if(!symbols.length) symbols = _symbols.symbolsDefault.map((s) => (s.symbol));
    for (let i = 0; i < symbols.length; i++) {
        let res = await api.klines(symbols[i], interval, periods)
        let close = res.map(d => d[4])
        let rsi = await indicators.rsi(close)
        let macd = await indicators.macd(close)
        console.warn(`${symbols[i]}, RSI: ${rsi}, periods: ${close.length} close: ${close[close.length - 1]}, macd:${macd}`)
        if((rsi < 35) || symbols.length == 1){
            let _data = {'symbol':symbols[i],'macd':macd}
            _data[`rsi(${interval})`] = rsi
            _data['close'] = close[close.length - 1],
            _data[`Sugested sell`] = close[close.length - 1] * 1.005
            result.push(_data)
        }
    }
    return result.sort((a, b) => a[`rsi(${interval})`] - b[`rsi(${interval})`]);
}

async function strategyNew(symbol, price, _quantity=null) {

    // TODO, check balance first
    let _while = 1
    let asset = _symbols.symbolsDefault.find((a) => a.symbol == symbol);
    let newOrder, buyOrder, sellOrder, priceFilled, sellPrice;
    
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
            sellOrder = await api.newOrder(symbol, _quantity, sellPrice, 'SELL', 'LIMIT')
        else
            throw "The order not filled correctly"

    
    } catch (error) {
        console.error(error)
        console.log(`Order to buy ${_quantity} on ${symbol} not tottaly completed`)
        
    }
    return {newOrder, buyOrder, sellOrder}
}

module.exports = { trending, strategyNew };
