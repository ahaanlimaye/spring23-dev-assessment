// dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// initialize app
const app = express();

// port
const APP_PORT = process.env.PORT || 8000;

// middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connects all API endpoints to app
const routes = require('./server/routes/apiRoutes');
app.use('/', routes);

// blank route (the most basic route)
app.get('/', (req, res) => {
    res.json({"Hello": "World",
            "Version": 2})
})

// starts app on designated port
app.listen(APP_PORT, () => {
    console.log(`api listening at http://localhost:${APP_PORT}`)
})