'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');

router.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '/../src/index.html'));
});

router.post('/register', async (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return next(new Error('all fields are required'));
  }
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const user = await User.create(userData);
    req.session.userId = user._id;
    return res.redirect('/profile');
  } catch (e) {
    return next(e);
  }
});

router.get('/profile', (req, res) => {
  User.findById(req.session.userId).exec((err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('unauthorized'));
    }
    return res.send(`<h1> Username: </h1> ${user.username} <h1> Email: </h1> ${user.email}`);
  });
});

module.exports = router;