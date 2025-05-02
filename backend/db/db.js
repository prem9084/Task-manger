import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connnect`);
  } catch (error) {
    console.log(error);
  }
};
