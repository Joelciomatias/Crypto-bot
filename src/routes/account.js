var express = require('express');
var router = express.Router();
let apiBinance = require('../integration/apiBinance')

router.get('/', async function(req, res, next) {

    apiBinance.accountInfo().then(result => {
        res.send({result});
    })
    .catch(err => {
        res.send({"error":"error"});
        console.error(err)
    });
})

module.exports = router;
