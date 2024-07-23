const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Connected to database');
    } catch (err) {
        console.log(err, "couldn't connect to database");
    }
}

// Export the function
module.exports = connectDB;
