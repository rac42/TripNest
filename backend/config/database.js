const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const connectDb = async()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Db connection successful");
    }
    catch(error) {
        console.log("Connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;