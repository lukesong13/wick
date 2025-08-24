//CONFIG
const FINNHUB_API_KEY = "d1ld5l1r01qt4thffdogd1ld5l1r01qt4thffdp0";
const FINNHUB_WEBSOCKET_URL = 'wss://ws.finnhub.io?token=' + FINNHUB_API_KEY;
const ALPHAVANTAGE_APIKEY = "ZFLQ8S4SFW1ZYYND";


//DOM ELEMENTS
let aaplPrice = document.getElementById("aapl-price");
let aaplTime = document.getElementById("aapl-time");

let binancePrice = document.getElementById("binance-price");
let binanceTime = document.getElementById("binance-time");

let vooPrice = document.getElementById("voo-price");
let vooTime = document.getElementById("voo-time");

let nvdaPrice = document.getElementById("nvda-price");
let nvdaTime = document.getElementById("nvda-time");

const INPUT_FORM = document.getElementById('input-form');

// Connection opened -> Subscribe

/* =======================
   Live Prices via Finnhub Web Socket
======================== */

let socket = new WebSocket(FINNHUB_WEBSOCKET_URL);
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

 /* =======================
   Alpha Vantage Date-Ranged Stock Data
======================== */

INPUT_FORM.addEventListener('submit', async (event) => {

    event.preventDefault();

    let ticker = document.getElementById('ticker').value.trim().toUpperCase();
    let start = document.getElementById('start').value.trim();
    let end = document.getElementById('end').value.trim();;

    try {
        const res = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ticker + '&apikey=' + ALPHAVANTAGE_APIKEY, {
            method: 'GET',
            headers: {
               'Content-Type' : 'application/json'
            } 
        });

        const data = await res.json();

        const DAILY_TIME_SERIES = data['Time Series (Daily)'];


      	// Filtering the response from the Alpha Vantage to grab the values based on date range entered by our user
        const FILTERED_ENTRIES = Object.keys(DAILY_TIME_SERIES)
  			.filter(date => date >= start && date <= end)
  			.reduce((acc, date) => {
    			acc[date] = DAILY_TIME_SERIES[date];
    			return acc;
  			}, {});
      
      	console.log(FILTERED_ENTRIES);
        
        /* =======================
   			Table Rendering
		======================== */

        const tableBody = document.getElementById('stock-info-table-body');
        tableBody.innerHTML="";

        Object.entries(FILTERED_ENTRIES).forEach(entry => {
          
            const date = entry[0];
            const data = entry[1];
            
            console.log("LOOK HERE");
            console.log(data["1. open"]);

            console.log(entry[0]);
            console.log(data);

            const row = document.createElement('tr');
            const dateTd = document.createElement('td');
            dateTd.textContent = entry[0];

            const openTd = document.createElement('td');
            openTd.textContent = data["1. open"];

            const highTd = document.createElement('td');
            highTd.textContent = data["2. high"];

            const lowTd = document.createElement('td');
            lowTd.textContent = data["3. low"];

            const closeTd = document.createElement('td');
            closeTd.textContent = data["4. close"];

            const volumeTd = document.createElement('td');
            volumeTd.textContent = data["5. volume"];

            row.appendChild(dateTd);
            row.appendChild(openTd);
            row.appendChild(highTd);
            row.appendChild(lowTd);
            row.appendChild(closeTd);
            row.appendChild(volumeTd);

            tableBody.appendChild(row);

            // document.getElementById('stock-info-table').style.display = 'table';
        
            var chart = new CanvasJS.Chart("chartContainer",
                {
                    title:{
                        text: "My Chart"
                    },
                    zoomEnabled: true,
                    axisY: {
                        includeZero:false,
                        title: "Prices",
                        prefix: "$ "
                    },
                    axisX: {
                        interval:2,
                        intervalType: "day",
                        labelAngle: -45
                    },
                    data: [
                    {
                        type: "candlestick",
                        dataPoints: [ //y: [Open, High ,Low, Close]
                            {x: new Date(2025,00,01),y:[5198, 5629, 5159, 5385]},
                            {x: new Date(2025,00,02),y:[5366, 5499, 5135, 5295]},
                            {x: new Date(2025,00,03),y:[5296, 5378, 5154, 5248]},
                            {x: new Date(2025,00,04),y:[5254, 5279, 4788, 4924]},
                            {x: new Date(2025,00,05),y:[4910, 5286, 4770, 5278]},
                            {x: new Date(2025,00,06),y:[5283, 5348, 5032, 5229]},
                            {x: new Date(2025,00,07),y:[5220, 5448, 5164, 5258]}
                        ]
                    }
                    ]
                });
                chart.render();
        });

    } catch (error) {
        console.error('error fetching earnings: ' + error);
    }
});





// window.onload = function (){
//     var chart = new CanvasJS.Chart("chartContainer",
//         {
//             title:{
//                 text: "My Chart"
//             },
//             zoomEnabled: true,
//             axisY: {
//                 includeZero:false,
//                 title: "Prices",
//                 prefix: "$ "
//             },
//             axisX: {
//                 interval:2,
//                 intervalType: "day",
//                 labelAngle: -45
//             },
//             data: [
//             {
//                 type: "candlestick",
//                 dataPoints: [ //y: [Open, High ,Low, Close]
//                     {x: new Date(2025,00,01),y:[5198, 5629, 5159, 5385]},
//                     {x: new Date(2025,00,02),y:[5366, 5499, 5135, 5295]},
//                     {x: new Date(2025,00,03),y:[5296, 5378, 5154, 5248]},
//                     {x: new Date(2025,00,04),y:[5254, 5279, 4788, 4924]},
//                     {x: new Date(2025,00,05),y:[4910, 5286, 4770, 5278]},
//                     {x: new Date(2025,00,06),y:[5283, 5348, 5032, 5229]},
//                     {x: new Date(2025,00,07),y:[5220, 5448, 5164, 5258]}
//                 ]
//             }
//             ]
//         });
//         chart.render();
// }
