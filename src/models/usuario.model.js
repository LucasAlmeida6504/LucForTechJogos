const mongoose = require('mongoose')

usuarioSchemas = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    usuarioname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profiles: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('usuario', usuarioSchemas)