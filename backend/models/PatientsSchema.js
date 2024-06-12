import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  photo: {
    type: String,
  },
  address: {
    type: String,
    notEmpty: { msg: "Please enter an address" },
  },
  city: {
    type: String,
    notEmpty: { msg: "Please enter a city" },
  },
  country: {
    type: String,
    notEmpty: { msg: "Please enter a country" },
  },
  phoneNumber: {
    type: String,
    notEmpty: { msg: "Please enter a number" },
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    notEmpty: { msg: "Please select an option" },
  },
});

export default mongoose.model("Patient", patientSchema);
