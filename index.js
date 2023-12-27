import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import { generateCode } from "./generateCode.js";
import mongoose from "mongoose";
import { CodeUserID } from "./user_codeModel.js";
import { Code } from "mongodb";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/getCode", async (req, res) => {
  try {
    const code = generateCode();
    const codeObject = { "code": code, "userID": "null" }; // Initialize userID as null

    //UNCOMMENT THIS WHEN USING

    const codeUserID = await CodeUserID.create(codeObject);

    //CHANGE THIS code to codeUserID WHEN USING
    return res.status(200).json(codeUserID);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// //endpoint to get all the data from the database
// app.get("/getAllCodes", async (req, res) => {
//   try {
//     const codes = await CodeUserID.find();
//     return res.status(200).json({
//       count: codes.length,
//       codes: codes,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// });

// app.post("/saveCode", async (req, res) => {
//   try {
//     if (!req.body.code || !req.body.userID) {
//       return response.status(400).send({
//         message: "Send all required fields",
//       });
//     }
//     const newUser = {
//       code: req.body.code,
//       userID: req.body.userID,
//     };
//     const codeUserID = await CodeUserID.create(newUser);

//     return res.status(201).send(codeUserID);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({
//       message: error.message,
//     });
//   }
// });

//update the userID
app.put("/updateCode/:id", async (req, res) => {
  try {
    if (!req.body.code || !req.body.userID) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    const { id } = req.params;
    const result = await CodeUserID.findByIdAndUpdate(id, req.body);
    console.log(result);
    if (!result) {
      return res.status(404).send({ message: "Code not found" });
    }

    return res
      .status(201)
      .send({ message: "Code updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});

//get a specific code data from the database
app.get("/checkCode/:code", async (req, res) => {
  try {
    const code = req.params.code;
    // Find the record in the database based on the provided code
    const codeUserID = await CodeUserID.findOne({ code: code });

    if (!codeUserID) {
      return res.status(404).json({ message: "Code not found" });
    }
    // Check if the userID is null for the found record
    const isUserIDNull = codeUserID.userID === "null" ? true : false;
    return res.status(200).json({ isUserIDNull: isUserIDNull });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

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
