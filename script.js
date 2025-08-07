console.log("test");

const API_KEY = "d1ld5l1r01qt4thffdogd1ld5l1r01qt4thffdp0";
const socket = new WebSocket('wss://ws.finnhub.io?token=d1ld5l1r01qt4thffdogd1ld5l1r01qt4thffdp0');

let aaplPrice = document.getElementById("aapl-price");
let aaplTime = document.getElementById("aapl-time");

let binancePrice = document.getElementById("binance-price");
let binanceTime = document.getElementById("binance-time");

let vooPrice = document.getElementById("voo-price");
let vooTime = document.getElementById("voo-time");

let nvdaPrice = document.getElementById("nvda-price");
let nvdaTime = document.getElementById("nvda-time");

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'VOO'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'NVDA'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

// Listen for messages
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

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}


const inputForm = document.getElementById('input-form');

inputForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    let tickerInput = document.getElementById('ticker');
    let startInput = document.getElementById('start');
    let endInput = document.getElementById('end');

    let entry = {};
    entry.ticker = tickerInput.value;
    entry.start = startInput.value;
    entry.end = endInput.value;

    console.log(entry);

    try {

        const res = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + entry.ticker + '&apikey=ZFLQ8S4SFW1ZYYND', {
            method: 'GET',
            headers: {
               'Content-Type' : 'application/json'
            }
            
        });

        const data = await res.json();

        console.log(data);

    } catch (error) {
        console.error('error fetching earnings: ' + error);
    }
});


