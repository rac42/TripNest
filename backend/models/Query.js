const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    query : {
        type: String,
        required: true
    },
    status : {
        type:String,
        enum: ['pending', 'resolved'],
        default: 'pending'
    }
}, {timestamps: true});

module.exports = mongoose.model('Query', querySchema);