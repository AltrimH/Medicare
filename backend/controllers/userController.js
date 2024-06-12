import User from "../models/UserSchema.js";
import Admin from "../models/AdminSchema.js";
import Patient from "../models/PatientsSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile data...",
      data: user,
    });
  } catch (error) {
    res.json({ success: false, message: "Error: " + error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "All users/patients were found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: users/patients were not found",
    });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const singleUser = await User.findById(userId).select("-password");

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

// update user -> setup-profile page
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const role = "patient";

  const { photo, address, city, country, phoneNumber, gender } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(id, {
      role,
      photo,
      address,
      city,
      country,
      phoneNumber,
      gender,
    });

    res.status(200).json({
      success: true,
      message: "User successfully updated",
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
  const userId = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "Successfully deleted user/patient",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user/patient",
    });
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
