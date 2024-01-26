import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    school: {
      type: String,
      required: true,
    },
    location: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    fieldStudy: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Qualification", qualificationSchema);
