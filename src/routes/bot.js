var express = require('express');
var router = express.Router();
let bot = require('../bot/trending')
let apiBinance = require('../integration/apiBinance')
const orderSize = 5;

router.post('/trending', async function(req, res, next) {

    bot.trending(req.body.interval, req.body.periods, req.body.symbols).then(result => {
        console.table(result);
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(500).send('ERROR')
        console.error(err)
    });
})

router.get('/search-order', async function(req, res, next) {
    try {
        let result = await apiBinance.queryOrder(req.body.symbol, req.body.orderId)
        if (result && result.response && result.response.status != 200) {
            res.status(result.response.status).send(result.response.data)   
        } else {
            res.status(200).send(result)   
        }

    } catch (error) {
        res.status(500).send('ERROR')
        console.error(error)
    }
})

router.post('/new-order', async function(req, res, next) {
    try {
        let result = await apiBinance.newOrder(req.body.symbol, req.body.quantity, req.body.price, req.body.side, req.body.type)
        if (result && result.response && result.response.status != 200) {
            res.status(result.response.status).send(result.response.data)   
        } else {
            res.status(200).send(result)   
        }

    } catch (error) {
        res.status(500).send('ERROR')
        console.error(error)
    }
})


router.post('/strategy', async function(req, res, next) {
    try {
        let result = await bot.strategyNew(req.body.symbol, req.body.price, req.body.quantity)
        res.status(200).send(result)   

    } catch (error) {
        res.status(500).send('ERROR')
        console.error(error)
    }
})
/* example res
FUTURE

BUY
{
    "orderId": 546575613,
    "symbol": "SOLBUSD",
    "status": "NEW",
    "clientOrderId": "3KXyFPZueMPnHMhW0cUs4D",
    "price": "0",
    "avgPrice": "0.0000",
    "origQty": "1",
    "executedQty": "0",
    "cumQty": "0",
    "cumQuote": "0",
    "timeInForce": "GTC",
    "type": "MARKET",
    "reduceOnly": false,
    "closePosition": false,
    "side": "BUY",
    "positionSide": "BOTH",
    "stopPrice": "0",
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false,
    "origType": "MARKET",
    "updateTime": 1634930336356
}
SELL:

{
    "orderId": 546650176,
    "symbol": "SOLBUSD",
    "status": "NEW",
    "clientOrderId": "vKBXSLF4NyTMge07fCtkgq",
    "price": "199.5000",
    "avgPrice": "0.0000",
    "origQty": "1",
    "executedQty": "0",
    "cumQty": "0",
    "cumQuote": "0",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "reduceOnly": false,
    "closePosition": false,
    "side": "SELL",
    "positionSide": "BOTH",
    "stopPrice": "0",
    "workingType": "CONTRACT_PRICE",
    "priceProtect": false,
    "origType": "LIMIT",
    "updateTime": 1634930671680
}
// spot 
{
    "symbol": "XRPUSDT",
    "orderId": 21675,
    "orderListId": -1,
    "clientOrderId": "RhTrJHXcQZWZf9wj0g14rj",
    "transactTime": 1634920734514,
    "price": "0.00000000",
    "origQty": "50.00000000",
    "executedQty": "50.00000000",
    "cummulativeQuoteQty": "18.50000000",
    "status": "FILLED",
    "timeInForce": "GTC",
    "type": "MARKET",
    "side": "BUY",
    "fills": [
        {
            "price": "0.37000000",
            "qty": "50.00000000",
            "commission": "0.00000000",
            "commissionAsset": "XRP",
            "tradeId": 1832
        }
    ]
}


*/


module.exports = router;
