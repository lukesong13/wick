# Wick
# https://celadon-sherbet-2d8b27.netlify.app/

## Summary

We will use Alpha Vantage's (AV) free API to retrieve daily stock information by passing a stock symbol. Our app will a 
date range from a user and we will parse that data from AV's API. After grabbing that data we will log it to the 
console and use HTML's Canvas API to create a candle stick chart with that data. Additionally, we will use Finnhub's
API to get real-time data on stcok updates for a select number of stocks.

## Finnhub Web Socket

* We are using the below to create an open connection to Finnhub that's constantly getting data:

**const socket = new WebSocket('wss://ws.finnhub.io?token={TOKEN}');**

* Subscriptions to stock symbols are accomplished with the below:

socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'VOO'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'NVDA'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

* The below event listener listens for changes and updates the view:

socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    let data=JSON.parse(event.data).data[0];

    if (data.s == "AAPL") {
        aaplPrice.innerHTML=  data.p;
    }

    if (data.s == "VOO") {
        vooPrice.innerHTML=  data.p;
    }

    if (data.s == "NVDA") {
        nvdaPrice.innerHTML=  data.p;
    }

    if (data.s == "BINANCE:BTCUSDT") {
        binancePrice.innerHTML=  data.p;
    }
});

## AlphaVantage API Data
* date
* open
* high
* low
* close
* volume

## Endpoints to Use
* https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo
This gives us daily information with open, high, low, close and goes back ~4 months.

* https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&outputsize=full&apikey=demo
This gives us daily information with the above but goes back 10+ years. If the response time is insignificant, we may 
just use this for all requests.

**NOTE:** Alpha Vantage limites 25 free requests per day.

### TO DO
* animation? (spline)
* change table color scheme to dark mode (text to white, colors darker, border black)
* make top of page ("WICK" h1) nicer





