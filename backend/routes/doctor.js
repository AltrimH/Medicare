import express from "express";
import {
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorProfile,
  myReviews,
  myQualifications,
  myExperience,
} from "../controllers/doctorController.js";

import reviewRouter from "./review.js";
import qualificationRoute from "./qualification.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);
router.use("/:doctorId/qualifications", qualificationRoute);

router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
router.get(
  "/reviews/my-reviews",
  authenticate,
  restrict(["doctor"]),
  myReviews
);
router.get(
  "/qualifications/my-qualification",
  authenticate,
  restrict(["doctor"]),
  myQualifications
);
router.get(
  "/experiences/my-experience",
  authenticate,
  restrict(["doctor"]),
  myExperience
);

export default router;
