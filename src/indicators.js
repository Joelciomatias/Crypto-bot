var tulind = require("tulind");

async function rsi(close, period=14) {
    return await tulind.indicators.rsi.indicator([close], [period]);
}

module.exports = { rsi };
