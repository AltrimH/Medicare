import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users were found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: Users not found",
    });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const singleUser = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "User was found",
      data: singleUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User was not found",
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log(id)

  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      // { $set: { password: hashPassword} },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully user updated",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully user deleted",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // retrieve appointments from booking for specific user
    const bookings = await Booking.find({ user: req.userId });

    // extract doctor ids from appointment bookings
    const doctorId = bookings.map((el) => el.doctor.id);

    // retrieve doctors using doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorId } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Appointments are getting",
      data: doctors,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Something went wrong cannot get" });
  }
};
