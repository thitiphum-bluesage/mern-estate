import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// import userRouter from "./routes/user.route.js";
import authRounter from "./routes/auth.route.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/test", (req, res) => {
  res.send("test");
});

// app.use("/api/user", userRouter);

app.use("/api/auth", authRounter);
