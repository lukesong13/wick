import { elements } from "./dom.js";
import { config } from "./config.js";

let pricesPerSymbol = [0,0,0,0,0,0,0,0,0,0];




//DOM ELEMENTS

// const INPUT_FORM = document.getElementById('input-form');

// let aaplPrice = document.getElementById("aapl-price");

// let binancePrice = document.getElementById("binance-price");


// let vooPrice = document.getElementById("voo-price");

// let nvdaPrice = document.getElementById("nvda-price");

// let aaplScroll = document.getElementById("aapl-scroll");
// let msftScroll = document.getElementById("msft-scroll");
// let nvdaScroll = document.getElementById("nvda-scroll");
// let amznScroll = document.getElementById("amzn-scroll");
// let googlScroll = document.getElementById("googl-scroll");
// let metaScroll = document.getElementById("meta-scroll");
// let tslaScroll = document.getElementById("tsla-scroll");
// let amdScroll = document.getElementById("amd-scroll");
// let nflxScroll = document.getElementById("nflx-scroll");
// let vooScroll = document.getElementById("voo-scroll");
// let binanceScroll = document.getElementById("binance-scroll");




/* =======================
   Populate h3 stocks on page load
======================== */

  (async function () {
    console.log("LOOK HEREEEEEE");
    let request = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${config.finnhubApiKey}`);
    let data = await request.json();
    let currentPrice = data.c;

    elements.aaplPrice.innerHTML=  currentPrice;

    request = await fetch(`https://finnhub.io/api/v1/quote?symbol=NVDA&token=${config.finnhubApiKey}`);
    data = await request.json();
    currentPrice = data.c;

    elements.nvdaPrice.innerHTML=  currentPrice;

    request = await fetch(`https://finnhub.io/api/v1/quote?symbol=VOO&token=${config.finnhubApiKey}`);
    data = await request.json();
    currentPrice = data.c;

    elements.vooPrice.innerHTML=  currentPrice;

  })();

/* =======================
   Live Prices via Finnhub Web Socket
======================== */

let socket = new WebSocket(config.finnhubWebsocketUrl);
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'MSFT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'NVDA'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMZN'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'GOOGL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'META'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'TSLA'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMD'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'NFLX'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'VOO'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
    //["AAPL","MSFT","NVDA","AMZN","GOOGL","META","TSLA","AMD","NFLX","VOO"];
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);

    let data=JSON.parse(event.data).data[0];

    if (data.s == "AAPL") {
        pricesPerSymbol[0]=  data.p;
        elements.aaplScroll.innerHTML= "AAPL: " + data.p + " |";
    }
    if (data.s == "MSFT") {
        pricesPerSymbol[1]=  data.p;
        elements.msftScroll.innerHTML= "MSFT: " + data.p + " |";
    }
    if (data.s == "NVDA") {
        pricesPerSymbol[2]=  data.p;
        elements.nvdaScroll.innerHTML= "NVDA: " + data.p + " |";
    }
     if (data.s == "AMZN") {
        pricesPerSymbol[3]=  data.p;
        elements.amznScroll.innerHTML= "AMZN: " + data.p + " |";
    }
     if (data.s == "GOOGL") {
        pricesPerSymbol[4]=  data.p;
        elements.googlScroll.innerHTML= "GOOGL: " + data.p + " |";
    }
     if (data.s == "META") {
        pricesPerSymbol[5]=  data.p;
        elements.metaScroll.innerHTML= "META: " + data.p + " |";
    }
     if (data.s == "TSLA") {
        pricesPerSymbol[6]=  data.p;
        elements.tslaScroll.innerHTML= "TSLA: " + data.p + " |";
    }
     if (data.s == "AMD") {
        pricesPerSymbol[7]=  data.p;
        elements.amdScroll.innerHTML= "AMD: " + data.p + " |";
    }
     if (data.s == "NFLX") {
        pricesPerSymbol[8]=  data.p;
        elements.nflxScroll.innerHTML= "NFLX: " + data.p + " |";
    }
     if (data.s == "VOO") {
        pricesPerSymbol[9]=  data.p;
        elements.vooScroll.innerHTML= "VOO: " + data.p + " |";
    }
    if (data.s == "BINANCE:BTCUSDT") {
        elements.binancePrice.innerHTML=  data.p;
        elements.binanceScroll.innerHTML= "BINANCE: " + data.p + " |";
    }
});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}

 /* =======================
   Alpha Vantage Date-Ranged Stock Data
======================== */

elements.inputForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    let ticker = document.getElementById('ticker').value.trim().toUpperCase();
    let start = document.getElementById('start').value.trim();
    let end = document.getElementById('end').value.trim();;

    try {
        const res = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ticker + '&apikey=' + config.alphavantageApiKey, {
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
      
        console.log("FILTERED ENTRIES");    
      	console.log(FILTERED_ENTRIES);
        
        /* =======================
   			Table Rendering
		======================== */

        // const tableBody = document.getElementById('stock-info-table-body');
        elements.stockInfoTableBody.innerHTML="";




        // Array of dates from FILTERED_ENTRIES
        let dataPointsRender = [ ];
// { x: new Date(2025,00,01), y:[5198, 5629, 5159, 5385] }


        Object.entries(FILTERED_ENTRIES).forEach(entry => {
          
            //"2025-07-18"
            const date = entry[0];
            //{1. open: '16.9200', 2. high: '17.0300', 3. low: '16.3600', 4. close: '16.7100', 5. volume: '50169299'}
            const data = entry[1];

            //RENDERING BELOW OBJECT
            //{x: new Date(2025,00,01),y:[5198, 5629, 5159, 5385]},
            let dataPointsEntry = {};

          	// Update date (YYYY-MM-DD) to instead be an array of [YYYY, MM, DD]
          	let updatedDate = date.split("-");

          	// dataPointsEntry.x = date;
          	dataPointsEntry.x = new Date(updatedDate[0], updatedDate[1]-1, updatedDate[2]);
          	//dataPointsEntry.y = [5198, 5629, 5159, 5385];
            dataPointsEntry.y = [Number(data["1. open"]), Number(data["2. high"]), Number(data["3. low"]), Number(data["4. close"])];

          	dataPointsRender.push(dataPointsEntry);

            console.log("LOOK HERE");
            console.log(data["1. open"]);

            console.log(date);
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

            elements.stockInfoTableBody.appendChild(row);

            document.getElementById('stock-info').style.display = 'table';
        });

         /* =======================
   			Chart Rendering
		======================== */


        var chart = new CanvasJS.Chart("chartContainer",
            {
                animationEnabled : true,
                backgroundColor: "000000",
                theme: "dark1",
              

                title:{
                    text: "99% of gamblers quit before they win big",
                    color: "0eff00"
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
                    color: "#867cb1ff", // up wicks
                    risingColor: "#2ED078",
                    fallingColor: "#F25F5C",
                    type: "candlestick",
                    dataPoints: dataPointsRender
                    
                }
                ]
            });
            chart.render();


    } catch (error) {
        console.error('error fetching earnings: ' + error);
    }
});

         /* =======================
   			Ticker Scroll
		======================== */

 (async function () {
    console.log("STOCK SYMBOLS FOR THE SCROLL");

    for (let i=0; i<config.symbols.length; i++) {
        let request = await fetch(`https://finnhub.io/api/v1/quote?symbol=${config.symbols[i]}&token=${config.finnhubApiKey}`);
        let data = await request.json();
        let currentPrice = data.c;
        pricesPerSymbol[i] = currentPrice;
    }

    console.log(pricesPerSymbol);

    elements.aaplScroll.innerHTML= "AAPL: " + pricesPerSymbol[0] + " |";
    elements.msftScroll.innerHTML= "MSFT: " + pricesPerSymbol[1] + " |";
    elements.nvdaScroll.innerHTML= "NVDA: " + pricesPerSymbol[2] + " |";
    elements.amznScroll.innerHTML= "AMZN: " + pricesPerSymbol[3] + " |";
    elements.googlScroll.innerHTML= "GOOGL: " + pricesPerSymbol[4] + " |";
    elements.metaScroll.innerHTML= "META: " + pricesPerSymbol[5] + " |";
    elements.tslaScroll.innerHTML= "TSLA: " + pricesPerSymbol[6] + " |";
    elements.amdScroll.innerHTML= "AMD: " + pricesPerSymbol[7] + " |";
    elements.nflxScroll.innerHTML= "NFLX: " + pricesPerSymbol[8] + " |";
    elements.vooScroll.innerHTML= "VOO: " + pricesPerSymbol[9] + " |";
    


 })();

 
