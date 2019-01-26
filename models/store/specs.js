const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const specs = new Schema({
    modelName: {
        type: String,
        required: true
    },
    modelNumber: {
        type: Number,
        required: true
    },
    extraInfo: {
        type: String,
    }
})

module.exports = mongoose.model('Specs', specs)