# Parking API

<img src="https://parklio.com/assets/img/parking-solutions/parklio-api/parkingStatus.jpg" align="right"
     alt="Size Limit logo by Anton Lovchikov" width="120" height="178">

Parking API is a bot in JavaScript to get the indicator data for sereval cryptocurrency coins.

## Setting up

1. Rename the `.env.template` to `.env`, and replace it with your values
  ```yml
  API_KEY=XXX
  API_URL=XXX
  SECRET_KEY=XXX
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
