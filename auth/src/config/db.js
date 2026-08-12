import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.AUTH_MONGO_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.error("Mongodb connection string: ", error);
    process.exit(1);
  }
};
