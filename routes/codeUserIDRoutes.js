import express from "express";
import { generateCode } from "../generateCode.js";
import { CodeUserID } from "../user_codeModel.js";
import { stepLocation } from "../step_locationModel.js";

const router = express.Router();

//generate and get a new code
router.get("/getCode", async (req, res) => {
  try {
    const code = generateCode();
    const codeObject = { code: code, userID: "null" }; // Initialize userID as null
    const codeUserID = await CodeUserID.create(codeObject);
    const createdId = codeUserID._id.toString();
    const responseData = {
      code: codeUserID.code,
      userID: codeUserID.userID,
      id: createdId,
    };
    return res.status(200).json(responseData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//update the data in the code and userID
router.put("/updateCode/:id", async (req, res) => {
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

    return res.status(201).send({ message: "Code updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});

//get a specific code status from the database
router.get("/checkCode/:code", async (req, res) => {
  try {
    const code = req.params.code;
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

// Handle PUT request to update step count and location data
router.put("/stepLocation/:id", async (req, res) => {
  const { id } = req.params;
  const { code , stepCounts, location } = req.body;

  try {
    const updatedData = await stepLocation.findByIdAndUpdate(
      id,
      { code, stepCounts, location },
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    return res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error updating data:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
