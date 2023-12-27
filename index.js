import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import codeUserIDRoutes from "./routes/codeUserIDRoutes.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use("/", codeUserIDRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
