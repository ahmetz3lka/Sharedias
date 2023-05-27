import mongoose from "mongoose";

let isConnected = false;

// This is lambda function that means after completed its job it'll be die
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
