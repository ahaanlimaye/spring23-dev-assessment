const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const APP_PORT = process.env.PORT || 8000;
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./server/routes/apiRoutes');
app.use('/', routes);

app.get('/', (req, res) => {
    res.json({"Hello": "World",
            "Version": 2})
})

app.listen(APP_PORT, () => {
    console.log(`api listening at http://localhost:${APP_PORT}`)
})