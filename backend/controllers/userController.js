const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
dotenv.config();

exports.registerUser = async(req,res)=> {
    const{name, email, password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message:"User already exists"});
        }

        let user  = new User({
            name, email, password
        });
        await user.save();
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'24hr'});
        user = user.toObject();
        delete user.password;
        res.status(201).json({token, user, message:'User registered successfully'});

    }catch(err) {
        res.status(500).json({error:error.message});
    }
};

exports.loginUser = async(req,res)=> {
    try{
        const {email,password} = req.body;
        let user = await User.findOne({email});
        if(!user) {
            return res.status(500).json({message:"No such user exists"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(500).json({message:"Invalid password"});
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'24hr'});
        user = user.toObject();
        delete user.password;
        res.status(200).json({token, user, message:'User Login successfully'});

    }catch(err) {
        res.status(500).json({error:err.message});
    }
};

exports.forgotPassword = async(req,res)=> {
    try{
        const {newPassword} = req.body;
        const user = req.user;
        
        user.password = newPassword;

        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });

    }catch(err) {
        res.status(500).json({error:err.message});
    }
    
}

exports.bookTicket = async(req,res)=> {

}