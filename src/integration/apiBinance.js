const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;
const secretKey = process.env.SECRET_KEY;

async function privateCall(path, data, method = 'GET'){
    const timestamp = (await time()).serverTime // TODO remove this call and get the offset utc time to sync to binance server time
    const signature = crypto.createHmac('sha256', secretKey)
                    .update(`${querystring.stringify({...data, timestamp})}`)
                    .digest('hex');
    const newData = {...data, timestamp, signature};
    const qs = `?${querystring.stringify(newData)}`;
    let url = `${apiUrl}${path}${qs}`
    try {
        const result = await axios({
            method,
            url: url,
            headers: {'X-MBX-APIKEY':apiKey}
        })
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

async function publicCall(path, data, method = 'GET'){
    try {
        const qs = data ? `?${querystring.stringify(data)}` : '';
        const result = await axios({
            method,
            url: `${apiUrl}${path}${qs}`
        })
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

async function accountInfo(){
    return privateCall('/v3/account')
}

async function time(){
    return publicCall('/v3/time')
}

async function newOrder(symbol, quantity, price, side='BUY', type='MARKET'){
    const data = {symbol, quantity, side, type}
    if(price) data.price = price;
    if(type === 'LIMIT') data.timeInforce = 'GTC';

    return privateCall('/v3/order',data,'POST')

}

async function klines(symbol, interval='1h', limit=100){
    return publicCall('/v3/klines',{symbol, interval, limit})
}

async function depth(symbol, limit=5){
    return publicCall('/v3/depth',{symbol, limit})
}

async function priceTicker(symbol=null){
    let data = {}
    if(symbol) data['symbol'] = symbol
    return publicCall('/v3/ticker/price',{...data})
}


async function exchangeInfo(){
    return publicCall('/v3/exchangeInfo')
}

module.exports = {time, depth, exchangeInfo, accountInfo, newOrder, klines, priceTicker}