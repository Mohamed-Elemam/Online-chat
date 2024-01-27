import mongoose from "mongoose";

export const dbConnection = async () => {
  console.log(process.env.LIVE_DATABASE_URL);
  await mongoose
    .connect("mongodb://127.0.0.1:27017/chat")
    .then(() => {
      console.log("connected successfully to database");
    })
    .catch((err) => {
      console.log("database connection failed", err);
    });
};
