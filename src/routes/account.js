const { json } = require('express');
var express = require('express');
var router = express.Router();
let apiBinance = require('../integration/apiBinance')
let symbols = require('../bot/symbols')

router.get('/', async function(req, res, next) {

    try {
        let result = await apiBinance.accountInfo()
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

router.get('/futures-symbols', async function(req, res, next) {

    try {
        let result = await symbols.symbolsBinance()

        res.status(200).send(result)   
        
    } catch (error) {
        res.status(500).send('ERROR')
        console.error(error)
    }
})

module.exports = router;
