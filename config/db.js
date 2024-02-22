const mongoose = require('mongoose');
const config = require('.');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error: ', err);
        process.exit(1); 
    }
};

module.exports = connectDB;

