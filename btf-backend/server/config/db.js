const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gymBackend')
        .then(() => {
            console.log('DB connection successful')
            console.log("Connected DB:", mongoose.connection.name);
        })
            
        .catch(err => {
            console.log(err)
        })
}

module.exports = connectDB;
