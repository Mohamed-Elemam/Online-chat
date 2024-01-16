import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/chat")
    .then(() => {
      console.log("connected successfully to database");
    })
    .catch((err) => {
      console.log("database connection failed", err);
    });
};
