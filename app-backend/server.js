const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');
// const data = require('./data.json');
// console.log(data[0].country);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(cors())



app.get('/', (req, res) => {
    // res.render('index')
    res.send("Good")
})

app.get('/api/fetch', (req, res) => {

    const url = 'https://www.thethingsnetwork.org/docs/lorawan/frequencies-by-country/';
    axios.get(url)
        .then(response => {
            const html = response.data;
            // HTML content is available in the "html" variable
            // Proceed with parsing and creating JSON object

            const cheerio = require('cheerio');

            // ... Fetch the HTML content using axios as shown in step 2 ...

            const $ = cheerio.load(html); // Load HTML into Cheerio

            // Extract data from specific elements using CSS selectors
            const rows = $('table tbody tr'); // Assuming the data is in a table with rows and columns
            const data = [];
            rows.each((index, row) => {
                const columns = $(row).find('td'); // Assuming each row has three columns
                const country = $(columns[0]).text();
                const frequencyPlan = $(columns[1]).text();
                const regulatoryDocument = $(columns[2]).text();
                data.push({ country, frequencyPlan, regulatoryDocument });
            });

            const jsonData = JSON.stringify(data);
            // fs.writeFileSync('./data.json', jsonData);
            res.send(jsonData);

        })
        .catch(error => {
            console.error(`Failed to fetch data from ${url}: ${error}`);
        });

})


const PORT = 5000
app.listen(PORT || process.env.PORT, (err) => {
    if (err)
        console.log(err)
    console.log(`Server started at port ${PORT}`);
})
