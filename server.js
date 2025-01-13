const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./server/database/connection')
const app = express();

app.use(morgan('tiny'));
dotenv.config({path:'config.env'});

const PORT = process.env.PORT || '7000';
const API_URL = process.env.API_URL;
connectDB.mongoose();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));

app.use('/', require('./server/routes/router'));

app.listen(PORT, ()=>{
    console.log(`server running on ${API_URL}`);
})