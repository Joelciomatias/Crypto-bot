const api = require('../integration/apiBinance')

async function symbolsBinance(symbol){
    try {
        const exchangeInfo = await api.exchangeInfo()
        let symbols = exchangeInfo.symbols.filter((s)=> s.status == 'TRADING' && s.contractType == 'PERPETUAL')

        return  symbols.map(({ symbol, pricePrecision, quantityPrecision }) => ({symbol, pricePrecision, quantityPrecision }));

    } catch (error) {
        console.error(error)
        return []
    }

}

const symbolsDefault =[
    {
        "symbol": "BTCUSDT",
        "pricePrecision": 2,
        "quantityPrecision": 3
    },
    {
        "symbol": "ETHUSDT",
        "pricePrecision": 2,
        "quantityPrecision": 3
    },
    {
        "symbol": "BCHUSDT",
        "pricePrecision": 2,
        "quantityPrecision": 3
    },
    {
        "symbol": "XRPUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "EOSUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "LTCUSDT",
        "pricePrecision": 2,
        "quantityPrecision": 3
    },
    {
        "symbol": "TRXUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "ETCUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 2
    },
    {
        "symbol": "LINKUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 2
    },
    {
        "symbol": "XLMUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "ADAUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "XMRUSDT",
        "pricePrecision": 2,
        "quantityPrecision": 3
    },
    {
        "symbol": "DASHUSDT",
        "pricePrecision": 2,
        "quantityPrecision": 3
    },
    {
        "symbol": "ZECUSDT", // zcash
        "pricePrecision": 2,
        "quantityPrecision": 3
    },
    {
        "symbol": "XTZUSDT", // zcash
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "BNBUSDT",// binance coin #3
        "pricePrecision": 3,
        "quantityPrecision": 2
    },
    {
        "symbol": "ATOMUSDT", // cosmos
        "pricePrecision": 3,
        "quantityPrecision": 2
    },
    {
        "symbol": "ONTUSDT", // Ontology # 110
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "IOTAUSDT",// miota #48
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "BATUSDT", //  basicc attention #85
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "VETUSDT", // vechain #22
        "pricePrecision": 6,
        "quantityPrecision": 0
    },
    {
        "symbol": "NEOUSDT", // neo #54
        "pricePrecision": 3,
        "quantityPrecision": 2
    },
    {
        "symbol": "QTUMUSDT",// qtum #81
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "IOSTUSDT", // iost #115
        "pricePrecision": 6,
        "quantityPrecision": 0
    },
    {
        "symbol": "THETAUSDT", // theta #28
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "ALGOUSDT",// Algorand #20
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "ZILUSDT", // Zilliqa #92
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "KNCUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "ZRXUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "COMPUSDT",
        "pricePrecision": 2,
        "quantityPrecision": 3
    },
    {
        "symbol": "OMGUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    // {
    //     "symbol": "DOGEUSDT",
    //     "pricePrecision": 6,
    //     "quantityPrecision": 0
    // },
    {
        "symbol": "SXPUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "KAVAUSDT",// Kava # 140
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "BANDUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "RLCUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "WAVESUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "MKRUSDT",
        "pricePrecision": 2,
        "quantityPrecision": 3
    },
    {
        "symbol": "SNXUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "DOTUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "YFIUSDT",
        "pricePrecision": 1,
        "quantityPrecision": 3
    },
    {
        "symbol": "BALUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "CRVUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "TRBUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "YFIIUSDT",
        "pricePrecision": 1,
        "quantityPrecision": 3
    },
    {
        "symbol": "RUNEUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "SUSHIUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "SRMUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "BZRXUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "EGLDUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "SOLUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "ICXUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "STORJUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "BLZUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "UNIUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "AVAXUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "FTMUSDT",
        "pricePrecision": 6,
        "quantityPrecision": 0
    },
    {
        "symbol": "HNTUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "ENJUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "FLMUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "TOMOUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "RENUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "KSMUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "NEARUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "AAVEUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "FILUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "RSRUSDT",
        "pricePrecision": 6,
        "quantityPrecision": 0
    },
    {
        "symbol": "LRCUSDT",// Loopring #76
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "MATICUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "OCEANUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "CVCUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "BELUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    // {
    //     "symbol": "CTKUSDT", //CertiK  #440
    //     "pricePrecision": 4,
    //     "quantityPrecision": 0
    // },
    {
        "symbol": "AXSUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "ALPHAUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "ZENUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "SKLUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "GRTUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "1INCHUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "AKROUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "CHZUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "SANDUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "ANKRUSDT",
        "pricePrecision": 6,
        "quantityPrecision": 0
    },
    {
        "symbol": "LUNAUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "BTSUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    // {
    //     "symbol": "LITUSDT",
    //     "pricePrecision": 3,
    //     "quantityPrecision": 1
    // },
    {
        "symbol": "UNFIUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "DODOUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "REEFUSDT",
        "pricePrecision": 6,
        "quantityPrecision": 0
    },
    {
        "symbol": "RVNUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "SFPUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "XEMUSDT", // NEM #74
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "COTIUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "CHRUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "MANAUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "ALICEUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "HBARUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "ONEUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "LINAUSDT", // #285 linear
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "STMXUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "DENTUSDT",
        "pricePrecision": 6,
        "quantityPrecision": 0
    },
    {
        "symbol": "CELRUSDT", // Celer Network #133
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "HOTUSDT",
        "pricePrecision": 6,
        "quantityPrecision": 0
    },
    {
        "symbol": "MTLUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "OGNUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    // {
    //     "symbol": "BTTUSDT",
    //     "pricePrecision": 6,
    //     "quantityPrecision": 0
    // },
    {
        "symbol": "NKNUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "SCUSDT",
        "pricePrecision": 6,
        "quantityPrecision": 0
    },
    {
        "symbol": "DGBUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    // {
    //     "symbol": "1000SHIBUSDT",
    //     "pricePrecision": 6,
    //     "quantityPrecision": 0
    // },
    {
        "symbol": "ICPUSDT",
        "pricePrecision": 2,
        "quantityPrecision": 2
    },
    {
        "symbol": "BAKEUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "GTCUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    // {
    //     "symbol": "ETHBUSD",
    //     "pricePrecision": 2,
    //     "quantityPrecision": 3
    // },
    // {
    //     "symbol": "BTCDOMUSDT",
    //     "pricePrecision": 1,
    //     "quantityPrecision": 3
    // },
    {
        "symbol": "KEEPUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "TLMUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    // {
    //     "symbol": "BNBBUSD",
    //     "pricePrecision": 3,
    //     "quantityPrecision": 2
    // },
    // {
    //     "symbol": "ADABUSD",
    //     "pricePrecision": 5,
    //     "quantityPrecision": 0
    // },
    // {
    //     "symbol": "XRPBUSD",
    //     "pricePrecision": 4,
    //     "quantityPrecision": 1
    // },
    {
        "symbol": "IOTXUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    // {
    //     "symbol": "DOGEBUSD",
    //     "pricePrecision": 6,
    //     "quantityPrecision": 0
    // },
    {
        "symbol": "AUDIOUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "RAYUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "C98USDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "MASKUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    {
        "symbol": "ATAUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 0
    },
    // {
    //     "symbol": "SOLBUSD",
    //     "pricePrecision": 4,
    //     "quantityPrecision": 0
    // },
    {
        "symbol": "FTTBUSD",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "DYDXUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    // {
    //     "symbol": "1000XECUSDT",
    //     "pricePrecision": 5,
    //     "quantityPrecision": 0
    // },
    {
        "symbol": "GALAUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "CELOUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "ARUSDT",
        "pricePrecision": 3,
        "quantityPrecision": 1
    },
    {
        "symbol": "KLAYUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 1
    },
    {
        "symbol": "ARPAUSDT",
        "pricePrecision": 5,
        "quantityPrecision": 0
    },
    {
        "symbol": "NUUSDT",
        "pricePrecision": 4,
        "quantityPrecision": 1
    }
]

module.exports = { symbolsDefault, symbolsBinance };
