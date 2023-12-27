import mongoose from "mongoose";

const codeUserIDSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

export const CodeUserID = mongoose.model("CodeUserID", codeUserIDSchema);
