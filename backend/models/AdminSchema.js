import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  surname: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin",
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
    enum: ["male", "female", "other"],
    notEmpty: { msg: "Please select an option" },
  },
});

export default mongoose.model("Admin", adminSchema);
