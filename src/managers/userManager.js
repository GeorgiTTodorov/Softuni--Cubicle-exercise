const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt.js');
const {SECRET} = require('../config/config.js');

exports.createUser = async ({username, password}) => {
    const hash = await bcrypt.hash(password, 9);

    const newUser = new User({username, password: hash});

    await newUser.save();

    return newUser;
}

exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Cannot find username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    const payload = {
        _id: user._id,
        username: user.username
    };

    const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'});

    return token;
}