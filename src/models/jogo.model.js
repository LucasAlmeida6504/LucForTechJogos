const mongoose = require('mongoose')

const jogoSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    value: {
        type: String,
        required: true
    },

    promotion: {
        type: Number,
        required: false
    }


})

module.exports = mongoose.model('jogo', jogoSchema)