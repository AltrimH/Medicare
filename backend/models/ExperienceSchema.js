import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    hospital: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // dateFrom: {
    //     type: Date,
    //     required: true
    // },
    // dateEnd: {
    //     type: Date,
    //     required: true
    // }
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
