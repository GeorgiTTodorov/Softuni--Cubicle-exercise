const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

// Middleware
function expressConfig (app) {

    app.use(express.static(path.resolve(__dirname, '..', 'public')));
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

}

module.exports = expressConfig;