const Query = require("../models/Query");
const User = require("../models/User");
const nodemailer = require("nodemailer");

exports.submitQuery = async(req,res)=> {
    try{
        const {query} = req.body;
        const userId = req.user._id;

        const newQuery = new Query({
            userId,
            query
        });
        await newQuery.save();
        const user = await User.findById(userId); 
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.query.push(newQuery._id);
        await user.save();
        // console.log(user,newQuery);
        // user = await User.findById(userId).populate('query').exec();
        res.status(201).json({message:"Query submitted successfully", user, newQuery});
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resolveQuery = async(req,res)=> {
    try{
        const {queryId} = req.params;
        const query = await Query.findById(queryId);
        if(!query) {
            return res.status(404).json({ message: "Query not found" });
        }
        query.status = 'resolved';
        await query.save();
        const user = await User.findById(query.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.query = user.query.filter(id => id.toString() != queryId);
        await user.save();
        res.status(200).json({ message: 'Query resolved' });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}