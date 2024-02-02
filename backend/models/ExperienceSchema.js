import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    hospital: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

experienceSchema.pre(/^find/, function (next) {
  this.populate({
    path: "doctor",
    select: "name photo phone about",
  });

  next();
});

export default mongoose.model("Experience", experienceSchema);
