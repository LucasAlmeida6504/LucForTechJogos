const mongoose = require('mongoose')

const consoleSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    cpu: {
        type: String,
        required: true
    },

    gpu: {
        type: String,
        required: true
    },

    storageSize: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('console', consoleSchema)