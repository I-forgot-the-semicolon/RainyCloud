const mongoose = require("mongoose");


const SessionsSchema = mongoose.Schema({
    session:{
        type: Object,
        uid: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        did: {
            type: String,
            required: false
        },
        dip: {
            type: String,
            required: false
        }
    }
});

module.exports = mongoose.model("sessions", SessionsSchema);