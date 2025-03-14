import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("mongodb is conneted");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
