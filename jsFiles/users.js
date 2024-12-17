const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usersSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    // verified: {
    //     type: Boolean,
    //     default: false
    // }

});

const users = mongoose.model('mitzinet_Adel', usersSchema);

module.exports = users;