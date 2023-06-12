const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    creatorId: {
        type: String,
        required: true
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;