#!usr/bin/env node
'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/authentication';
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

// connect to mongoose

(async function () {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
  } catch (e) {
    console.log(e);
  }
})();

app.use(session({
  secret: 'xyz',
  resave: true,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
