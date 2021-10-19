const api = require('../integration/apiBinance')
const indicators = require('../indicators')

async function trending() {
    const data = await api.priceTicker()
    const coins = Array.isArray(data) ? data.map(d => d['symbol']) : [data['symbol']]
    const symbols = coins.filter(b => b.indexOf('USDT') !== -1)
    console.log(symbols)
    result = []
    for (let i = 0; i < symbols.length; i++) {
        let res = await api.klines(symbols[i], '5m', 100)
        let rsi = await indicators.rsi(res.map(d => d[4]))
        console.log(`${symbols[i]}, RSI: ${rsi}`)
        if(rsi < 35 || rsi > 70){
            result.push({
                'symbol':symbols[i],
                'rsi':rsi
            })
        }
    }
    let res = result.sort((a, b) => a['rsi'] > b['rsi']);
    return res

}
module.exports = { trending };
