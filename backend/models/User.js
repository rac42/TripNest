const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    bookedFlights:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    query:[{
        type:mongoose.Schema.ObjectId,
        ref: 'Query'
    }]
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);