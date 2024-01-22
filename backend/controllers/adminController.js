import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Admin from "../models/AdminSchema.js";

import bcrypt from "bcryptjs";

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Admins were found",
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: Admins not found",
    });
  }
};

export const getAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const singleAdmin = await Admin.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "Admin was found",
      data: singleAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin was not found",
    });
  }
};

export const updateAdmin = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const updateAdmin = await Admin.findByIdAndUpdate(
      id,
      { $set: { password: hashPassword } },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully admin updated",
      data: updateAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update admin",
    });
  }
};

export const deleteAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteAdmin = await Admin.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully admin deleted",
      data: deleteAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete admin",
    });
  }
};

export const getAdminProfile = async (req, res) => {
  const adminId = req.userId;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const { password, ...rest } = admin._doc;
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
