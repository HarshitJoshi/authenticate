#!usr/bin/env node
'use strict';

const express = require('express');
const app = express();
const routes = require('./routes/router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/authentication';
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

// connect to mongoose

(async function() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true });
    } catch(e) {
        console.log(e);
    }
})();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(3000);
console.log('Running on port 3000...');
