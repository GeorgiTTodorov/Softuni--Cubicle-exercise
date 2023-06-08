const mongoose = require('mongoose');

const accesorySchema = new mongoose.Schema({
    name: String, 
    description: String, 
    imageUrl: String
});

const Accessory = mongoose.model('Accessory', accesorySchema);

module.exports = Accessory;