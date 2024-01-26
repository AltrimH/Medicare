import Experience from "../models/ExperienceSchema.js";
import Doctor from "../models/DoctorSchema.js";

// get all Reviews
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({});

    res.status(200).json({
      success: true,
      message: "Successful",
      data: experiences,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found!",
    });
  }
};

// create review
export const createExperience = async (req, res) => {
  if (!req.body.doctor) {
    req.body.doctor = req.params.doctorId;
  }

  if (!req.body.user) {
    req.body.user = req.params.userId;
  }

  const newExperience = await Experience(req.body);

  try {
    const savedExperience = await newExperience.save();

    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { experiences: savedExperience },
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Experience submitted",
        data: savedExperience,
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
