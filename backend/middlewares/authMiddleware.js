const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = async(req,res,next)=> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token or invalid format" });
    }
    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: "Token missing"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // console.log(req.user);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;