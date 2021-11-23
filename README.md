# Crypto-bot

<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F9jacashflow.com%2Fwp-content%2Fuploads%2F2019%2F08%2Fcryptobot.jpeg&f=1&nofb=1" align="right"
     alt="A Robot trading cryptocurrencies" width="180" height="120">

Crypto Bot is a bot in JavaScript to get the indicator data for sereval cryptocurrency coins.

## Setting up

1. Rename the `.env.template` to `.env`, and replace it with your values
  ```yml
  API_URL_FUTURES=https://fapi.binance.com/fapi/v1
  API_URL=https://testnet.binance.vision/api/v3
  API_KEY=xxxx
  SECRET_KEY=xxxx

  API_URL_FUTURES_TEST=https://testnet.binancefuture.com/fapi/v1
  API_URL_SPOT_TEST=https://testnet.binance.vision/api/v3
  API_KEY_SPOT_TEST=xxxx
  SECRET_KEY_SPOT_TEST=xxx

  OPERATION=1
  CRAWLER_INTERVAL=40000
  PROFIT=1.011
  STOP_LOSS=0.99
  QUANTITY=5
  SYMBOL=BTCUSDT

  TELEGRAN_BOT=bot_id:api_token
  GROUP_CHAT_ID=-000000000
  ```

## Usage

### JS Applications

Is a express.js application, it connect to the binance api and get the values.

With docker

1. Run the container:

    ```sh
    $ docker-compose up
    ```
Run the node directly

1. Add the `size-limit` section and the `size` script to your `package.json`:

    ```node
    $ npm install
    $ npm run start
    ```
