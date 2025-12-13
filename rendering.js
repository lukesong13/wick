import { elements } from './dom.js';

let dataPointsRender = [ ];

export function renderTable(FILTERED_ENTRIES) {

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
};

export function renderChart() {

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
}

    
