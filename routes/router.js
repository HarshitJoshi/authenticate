'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');

router.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '/../src/index.html'));
});

router.post('/register', async (req, res, next) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.username) {
    return next(new Error('all fields are required'));
  }
  const userData = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const user = await User.create(userData);
    req.session.userId = user._id;
    // TODO: activation link
    return res.redirect('/profile');
  } catch (e) {
    return next(e);
  }
});

router.post('/login', async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return next(new Error('all fields are required'));
  }
  const credentials = {
    username: req.body.username,
    password: req.body.password
  }
  try {
    const login = await User.authenticate(credentials);
    if (!login) {
      return next(new Error('Invalid credentials'));
    }
    // TODO: send to homepage
    res.send(`Login successful: ${login.verify}`);
  } catch (e) {
    return next(e);
  }
});

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return next(new Error('unauthorized'));
    }
    return res.send(`<h1> Username: </h1> ${user.username} <h1> Email: </h1> ${user.email}`);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;