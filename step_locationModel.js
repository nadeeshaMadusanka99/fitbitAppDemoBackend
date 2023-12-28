import mongoose from "mongoose";

const stepLocationSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  stepCounts: {
    type: Number,
    required: true,
  },
  location: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
});

export const stepLocation = mongoose.model("stepLocation", stepLocationSchema);
