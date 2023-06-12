const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
    },
    username: String,
    password: String   // hashed with bcrypt
});

const User = mongoose.model('User', userSchema);

module.exports = User;