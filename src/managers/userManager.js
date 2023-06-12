const User = require('../models/User.js');
const bcrypt = require('bcrypt');

exports.createUser = async ({username, password}) => {
    const hash = await bcrypt.hash(password, 9);

    const newUser = new User({username, password: hash});

    await newUser.save();

    return newUser;
}