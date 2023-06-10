const mongoose = require("mongoose");

// function connects to mongo db
const connectDB = async () => {
  try {
    // connects to mongo db with uri in env file.
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log(error);
    // exist process.
    process.exit(1);
  }
};

module.exports = connectDB;
