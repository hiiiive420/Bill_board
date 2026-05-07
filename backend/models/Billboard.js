import mongoose from "mongoose";

const billboardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },

  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },

  isAvailable: {
    type: Boolean,
    default: true
  },

  // 🔥 NEW FIELD
  isInDemand: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("Billboard", billboardSchema);