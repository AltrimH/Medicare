import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
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
    default: "doctor",
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
    notEmpty: { msg: "Please enter a phone number" },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    notEmpty: { msg: "Please select an option" },
  },
  ticketPrice: {
    type: Number,
  },
  specialization: {
    type: String,
  },
  qualifications: {
    type: Array,
  },
  experiences: {
    type: Array,
  },
  bio: {
    type: String,
    maxLength: 50,
  },
  about: {
    type: String,
  },
  timeSlots: {
    type: Array,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

export default mongoose.model("Doctor", DoctorSchema);
