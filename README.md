# Crypto-bot

<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F9jacashflow.com%2Fwp-content%2Fuploads%2F2019%2F08%2Fcryptobot.jpeg&f=1&nofb=1" align="right"
     alt="A Robot trading cryptocurrencies" width="180" height="120">

Crypto Bot is a bot in JavaScript to get the indicator data for sereval cryptocurrency coins.

## Setting up

1. Rename the `.env.template` to `.env`, and replace it with your values
  ```yml
  API_URL=https://testnet.binance.vision/api
  API_KEY=xxxx
  SECRET_KEY=xxxx
  CRAWLER_INTERVAL=10000
  PROFITABILITY=1.05
  SYMBOL=BTCUSDT
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
