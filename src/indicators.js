const tulind = require("tulind");

async function rsi(close, window=14, full=false) {
    let res = await tulind.indicators.rsi.indicator([close], [window]);
    return full ? res : res[0][res[0].length - 1]
}

async function macd(close, options=[25, 56, 12], full=false) {
    let res = await tulind.indicators.macd.indicator([close], options);
    return full ? res : res[0][res[0].length - 1]
}

module.exports = { rsi, macd};
