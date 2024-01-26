import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Reviews from "../models/ReviewSchema.js";
import Qualification from "../models/QualificationSchema.js";

export const getDoctors = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: true,
      message: "Doctors were found",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: Doctor not found",
    });
  }
};

export const getDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const singleDoctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Doctor was found",
      data: singleDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Doctor was not found",
    });
  }
};

export const updateDoctor = async (req, res) => {
  const { name, specialization, phone, tickedNumber, bio, about, photo } =
    req.body;
  const id = req.params.id;

  // hash new password

  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully Doctor Updated",
      data: updateDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Update Doctor",
    });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteDoctor = await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully Doctor Deleted",
      data: deleteDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Delete Doctor",
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const myReviews = async (req, res) => {
  try {
    // retrieve reviews from reviews for a specific doctor
    const reviews = await Reviews.find({ doctor: req.userId });

    res.status(200).json({
      success: true,
      message: "Reviews are getting",
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong, cannot get",
    });
  }
};

export const myQualifications = async (req, res) => {
  try {
    console.log(req.userId)
    const qualifications = await Qualification.find({ doctor: req.userId });

    res.status(200).json({
      success: true,
      message: "Qualifications are getting",
      data: qualifications
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong, cannot get",
    });
  }
};

// export const addQualification = async (req, res) => {
//   try {
//     // const { school, location, degree, fieldStudy } = req.body;
//     const qualification = await Doctor.findByIdAndUpdate(
//       { doctor: req.userId },
//       { $set: { qualifications: req.body } }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Successfully Added Qualification for Doctor",
//       data: qualification,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Something went wrong, cannot add",
//     });
//   }
// };
