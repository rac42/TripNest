const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req,res) => {
    res.send("Backend is up and running!");
})

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});
