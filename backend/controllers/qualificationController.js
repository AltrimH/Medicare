import Qualification from "../models/QualificationSchema.js";
import Doctor from "../models/DoctorSchema.js";

import {check, validationResult} from 'express-validator';

// get all Reviews
export const getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find({});

    res.status(200).json({
      success: true,
      message: "Successful",
      data: qualifications,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found!",
    });
  }
};

// create review
export const createQualification = async (req, res) => {
  if (!req.body.doctor) {
    req.body.doctor = req.params.doctorId;
  }

  if (!req.body.user) {
    req.body.user = req.params.userId;
  }

  const newQualification = await Qualification(req.body);

  try {
    const savedQualification = await newQualification.save();

    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { qualifications: savedQualification },
    });

    res
      .status(200)
      .json({ success: true, message: "Qualification submitted", data: savedQualification });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
