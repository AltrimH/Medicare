import jwt from "jsonwebtoken";

import Admin from "../models/AdminSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const auth = async (req, res, next) => {
  // get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  let user;

  const admin = await Admin.findById(req.user.id)
  const doctor = await Doctor.findById(req.user.id)
  const patient = await User.findById(req.user.id)

  if(admin){
    user = admin
  }
  if(doctor){
    user = doctor
  }
  if(patient){
    user = patient
  }

  if (!roles.includes(user.role)) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  }
  next();
};
