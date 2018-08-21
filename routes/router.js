const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    return res.send('hello world');
});

router.get('/about', (req, res) => {
    return res.send('Node authentication app');
});

router.post('/', (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return next(new Error('all fields are required'));
    }
    const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    };
    User.create(userData, (err, user) => {
        if (err) {
            return next(err);
        }
        req.session.userId = user._id;
        return res.redirect('/profile');
    });
});

router.get('/profile', (req, res) => {
    User.findById(req.session.userId).exec((err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new Error('unauthorized',));
        }
        return res.send(`<h1> Username: </h1> ${req.username}, <h1> Email: </h1> ${req.email}`);
    });
});

module.exports = router;