const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    creditnumber: {
        type: Number, 
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not valid'
        }
    },
    schedule: {
        type: String,
        required: true
    }
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;