import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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
      enum: ["user", "patient"],
      default: "user",
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
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
