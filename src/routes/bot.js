var express = require('express');
var router = express.Router();
let bot = require('../bot/trending')

router.post('/trending', async function(req, res, next) {

    bot.trending(req.body.interval, req.body.symbols).then(result => {
        console.table(result);
        res.send({result});
    })
    .catch(err => {
        res.send({"error":"error"});
        console.error(err)
    });
})

module.exports = router;
