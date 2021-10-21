const api = require('../integration/apiBinance')
const indicators = require('../indicators')
const _symbols = require('./symbols')

async function trending(interval='5m', symbols=[]) {
    let result = []
    if(!symbols.length) symbols = _symbols
    for (let i = 0; i < symbols.length; i++) {
        let res = await api.klines(symbols[i], interval, 100)
        let periods = res.map(d => d[4])
        let rsi = await indicators.rsi(periods)
        console.log(`${symbols[i]}, RSI: ${rsi}, periods: ${periods.length}`)
        if(rsi < 35){
            let _data = {'symbol':symbols[i]}
            _data[`rsi(${interval})`] = rsi
            result.push(_data)
        }
    }
    return result.sort((a, b) => a[`rsi(${interval})`] - b[`rsi(${interval})`]);
}
module.exports = { trending };
