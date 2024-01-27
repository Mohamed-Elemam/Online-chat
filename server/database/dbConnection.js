import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(process.env.LIVE_DATABASE_URL)
    .then(() => {
      console.log("connected successfully to database");
    })
    .catch((err) => {
      console.log("database connection failed", err);
    });
};
