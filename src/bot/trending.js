const api = require('../integration/apiBinance')
const indicators = require('../indicators')
const _symbols = require('./symbols')

async function trending(interval='5m', periods=200, symbols=[]) {
    let result = []
    if(!symbols.length) symbols = _symbols
    for (let i = 0; i < symbols.length; i++) {
        let res = await api.klines(symbols[i], interval, periods)
        let close = res.map(d => d[4])
        let rsi = await indicators.rsi(close)
        let macd = await indicators.macd(close)
        console.warn(`${symbols[i]}, RSI: ${rsi}, periods: ${close.length}`)
        if((rsi < 35) || symbols.length == 1){
            let _data = {'symbol':symbols[i],'close':close[close.length - 1],'macd':macd}
            _data[`rsi(${interval})`] = rsi
            result.push(_data)
        }
    }
    return result.sort((a, b) => a[`rsi(${interval})`] - b[`rsi(${interval})`]);
}
module.exports = { trending };
