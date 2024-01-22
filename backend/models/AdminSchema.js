import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "patient", "doctor"],
    // default: "patient",
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  }
});

export default mongoose.model("Admin", adminSchema);
