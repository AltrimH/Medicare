import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    school: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    fieldStudy: {
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

qualificationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "doctor",
    select: "name photo about bio",
  });

  next();
});

export default mongoose.model("Qualification", qualificationSchema);
