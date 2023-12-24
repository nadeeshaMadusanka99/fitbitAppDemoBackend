import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import { generateCode } from "./generateCode.js";
import mongoose from "mongoose";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/getCode", (req, res) => {
  const code = generateCode();
  const codeObject = { code: code };
  return res.status(200).json(codeObject);
});

app.post("/saveCode", async (req,res)=> {
    try{
        if(!req.body.code || !req.body.userID){
            return response.status(400).send({
                message : 'Send all required fields',
            });
        }
        const newUser = {
            code : req.body.code,
            userID : req.body.userID,
        };
        const codeUserID = new CodeUserID(newUser);
        return res.status(201).send(codeUserID);
    } catch(error){
        console.log(error.message);
        response.status(500).send({
            message : error.message,
        });
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
