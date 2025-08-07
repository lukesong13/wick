const express = require('express');
const path = require('path');
const finnhub = require('finnhub');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (JS, CSS, images, etc.)
app.use(express.static(path.join(__dirname)));

const finnhubClient = new finnhub.DefaultApi('d1ld5l1r01qt4thffdogd1ld5l1r01qt4thffdp0')

// Route for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/stock', (req, res) => {

    const {start,end,symbol} = req.body;

    finnhubClient.earningsCalendar({"from": start, "to": end, "symbol" : symbol}, (error, data, response) => {
        if (error) {
            console.log('finnhub server error: ' + error);
        }
        console.log(data);
        res.json(data);
    });
});

// app.get('/stock', (req, res) => {

//     finnhubClient.earningsCalendar({"from": "2025-07-15", "to": "2025-07-19", "symbol" : "HBAN"}, (error, data, response) => {
//         if (error) {
//             console.log('finnhub server error: ' + error)
//         }
//         console.log(data)
//     });
// });



app.listen(port, () => {
    console.log(`Server started. Available at http://localhost:${port}`);
});



