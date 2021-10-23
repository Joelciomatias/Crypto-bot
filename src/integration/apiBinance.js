const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');
require('dotenv').config();
// const apiUrl = process.env.API_URL_SPOT_TEST;
// const apiKey = process.env.API_KEY_SPOT_TEST;
// const secretKey = process.env.SECRET_KEY_SPOT_TEST;

const apiUrl = process.env.API_URL_FUTURES;
const apiKey = process.env.API_KEY;
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
        return error;
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
        return error;
    }
}

async function accountInfo(){
    return privateCall('/account')
}

async function futuresBalance(){
    return publicCall('/balance')
}

async function time(){
    return publicCall('/time')
}

async function newOrder(symbol, quantity, price, side='BUY', type='MARKET'){
    const data = {symbol, side, type, quantity}
    if(price) {
        data.price = price
        data.recvWindow = 5000
    }
    if(type === 'LIMIT') data.timeInForce = 'GTC';

    return privateCall('/order', data, 'POST')

}

async function queryOrder(symbol, orderId=null){
    const data = {symbol}
    if(orderId) data.orderId = orderId;

    return privateCall('/order', data)

}

async function klines(symbol, interval='1h', limit=100){
    return publicCall('/klines',{symbol, interval, limit})
}

async function depth(symbol, limit=5){
    return publicCall('/depth',{symbol, limit})
}

async function priceTicker(symbol=null){
    let data = {}
    if(symbol) data['symbol'] = symbol
    return publicCall('/ticker/price',{...data})
}


async function exchangeInfo(){
    return publicCall('/exchangeInfo')
}

module.exports = {time, depth, exchangeInfo, accountInfo,futuresBalance, newOrder, queryOrder, klines, priceTicker}