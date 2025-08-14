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

        const DAILY_TIME_SERIES = data['Time Series (Daily)'];

        // console.log(Object.keys(DAILY_TIME_SERIES));
        // console.log(data);
        // console.log(data['Time Series (Daily)']);

        const START_DATE = entry.start;
        const END_DATE = entry.end;

        const FILTERED_ENTRIES = Object.keys(DAILY_TIME_SERIES)
  			.filter(date => date >= START_DATE && date <= END_DATE)
  			.reduce((acc, date) => {
    			acc[date] = DAILY_TIME_SERIES[date];
    			return acc;
  			}, {});
      
      	console.log(FILTERED_ENTRIES);

        //TABLE START
        const tableBody = document.getElementById('stock-info-table-body');

        tableBody.innerHTML="";

        Object.entries(FILTERED_ENTRIES).forEach(entry => {
          
          console.log(entry[0]);
          console.log(entry[1]);
          
            const row = document.createElement('tr');

            const dateTd = document.createElement('td');
            dateTd.textContent = entry[0];

            // const openTd = document.createElement('td');
            // openTd.textContent = FILTERED_ENTRIES.open;

            // const highTd = document.createElement('td');
            // highTd.textContent = FILTERED_ENTRIES.high;

            // const lowTd = document.createElement('td');
            // lowTd.textContent = FILTERED_ENTRIES.low;

            // const closeTd = document.createElement('td');
            // closeTd.textContent = FILTERED_ENTRIES.close;

            // const volumeTd = document.createElement('td');
            // volumeTd.textContent = FILTERED_ENTRIES.volume;

            row.appendChild(dateTd);
            // row.appendChild(openTd);
            // row.appendChild(highTd);
            // row.appendChild(lowTd);
            // row.appendChild(closeTd);
            // row.appendChild(volumeTd);
  

            tableBody.appendChild(row);

            // document.getElementById('stock-info-table').style.display = 'table';
        });

    } catch (error) {
        console.error('error fetching earnings: ' + error);
    }
});


