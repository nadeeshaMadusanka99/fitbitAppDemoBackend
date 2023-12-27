import mongoose from "mongoose";

const stepLocationSchema = mongoose.Schema({
  stepCounts: {
    type: Number,
    required: true,
  },
  Location: {
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
