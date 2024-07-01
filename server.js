// importing express
const express = require('express');
// importing our db from connection.js
const db = require('./config/connection');
// importing our routes
const routes = require('./routes');

// defining our port
const PORT = 3001;
// defining express as our app variable
const app = express();

// accepting url encoded and json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// saying to use express to handle our routes
app.use(routes);

// once our database is open, set up our server and log that it's running on our port
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});