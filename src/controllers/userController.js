const router = require('express').Router();
const userManager = require('../managers/userManager.js');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {


    res.redirect('/');
});

module.exports = router;