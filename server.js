require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const cookieParser = require('cookie-parser');
const environment = process.env.NODE_ENV;
const stage = require('./config/index')[environment];
const app = express();
const router = express.Router();
const cors = require('cors');

app.disable('x-powered-by'); 
//app.use(stage.headers);
app.use(cors(stage.corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// mongo db
mongoose.connect(stage.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB connection established"));

app.route('/').get(function (req, res) {
    res.send("Main page");
});

app.use('/api/v1/', routes(router));

app.get('*', function (req, res) {
    res.json({
        res: "404 not found"
    });
});

app.post('*', function (req, res) {
    res.json({
        res: "404 not found"
    });
});

app.listen(stage.port, () => {
    console.log('API server started on: ' + stage.port);
});

module.exports = app;