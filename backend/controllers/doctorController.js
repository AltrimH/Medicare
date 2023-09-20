import Doctor from "../models/DoctorSchema.js";

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
    const singleDoctor = await Doctor.findById(id).select("-password");

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
  const id = req.params.id;

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
