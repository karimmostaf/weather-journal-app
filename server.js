// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// TODO-Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
    /* Middleware*/
    //Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//TODO-Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;
//GET route to returns the projectData object
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData);
}
// Setup Server
const server = app.listen(port, () => {
        console.log('server running');
        console.log(`server on localhost:${port}`);
    })
    // todo post routes
app.post('/addWeather', addData);

function addData(req, res) {
    let data = req.body;
    projectData.temp = data.temp;
    projectData.date = data.date;
    projectData.content = data.content;
    res.send(projectData);
}