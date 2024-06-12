import User from "../models/UserSchema.js";
import Patient from "../models/PatientsSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

import bcrypt from "bcryptjs";

// GET SINGLE PATIENT
export const getPatient = async (req, res) => {
  const id = req.params.id;

  try {
    const patient = await Patient.findById(id)
      .populate("user")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Patient was found",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error server. Try again",
    });
  }
};

// GET ALL PATIENTS
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({})
      .populate("user")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Patients were found",
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error server. Try again",
    });
  }
};

// ADD/CREATE NEW PATIENT FROM ADMIN DASHBOARD
export const createPatient = async (req, res) => {
  console.log(req.body.email);
  try {
    const emailExists = await User.find({ email: req.body.email });

    console.log(emailExists);
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "This email already exists" });
    }

    let {
      name,
      surname,
      email,
      password,
      role,
      photo,
      address,
      city,
      country,
      phoneNumber,
      gender,
    } = req.body;

    const user = {
      name,
      surname,
      email,
      password,
      role,
    };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;

    const registeredUser = await User.create(user);

    const patient = {
      user: registeredUser._id,
      photo,
      address,
      city,
      country,
      phoneNumber,
      gender,
    };
    const registeredPatient = await Patient.create(patient);

    return res.status(200).json({
      success: true,
      registeredPatient: [registeredUser, registeredPatient],
      message: "Patient is registered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message + " Internal error server",
    });
  }
};

// CREATE/UPDATE EXISTING PATIENT FROM CLIENT SIDE
export const createUpdatePatient = async (req, res) => {
  const role = "superadmin";

  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: role });

    const patient = {
      user: user.id,
      photo: req.body.photo,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
    };

    const createdPatient = await Patient.create(patient);

    res.status(200).json({
      success: true,
      message: "Patient created successfully",
      updatePatient: createdPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message + " Internal error server. Try again",
    });
  }
};

// DELETE PATIENT
export const deletePatient = async (req, res) => {
  const id = req.params.id;

  try {
    const deletePatient = await Patient.findByIdAndDelete(id);

    res.status({
      success: true,
      message: "Successfully deleted patient",
      data: deletePatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error server. Try again",
    });
  }
};

// GET APPOINTMENTS OF SPECIFIC PATIENT FORM CLIENT SIDE
export const getAppointments = async (req, res) => {
  try {
    // get appointments from booking for specific patient
    const bookings = await Booking.find({ user: req.user.id });

    // get doctors ids from appointments booking
    const doctorId = bookings.map((element) => element.doctor.id);

    // get doctors using doctors ids
    const doctors = await Doctor.find({ _id: { $in: doctorId } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Getting all appointments of this patient",
      data: doctors,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong, cannot get",
    });
  }
};
