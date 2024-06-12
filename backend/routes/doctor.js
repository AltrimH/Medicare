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

// import { authenticate, restrict } from "../auth/verifyToken.js";
import { auth, restrict } from "../middleware/auth.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);
router.use("/:doctorId/qualifications", qualificationRoute);

router.get("/", auth, restrict(["admin", "superadmin"]), getDoctors);
router.get("/:id", auth, restrict(["admin", "superadmin"]), getDoctor);
router.put(
  "/:id",
  auth,
  restrict(["doctor", "admin", "superadmin"]),
  updateDoctor
);
router.delete("/:id", auth, restrict(["doctor", "admin", "superadmin"]), deleteDoctor);
router.get("/profile/me", auth, restrict(["doctor"]), getDoctorProfile);
router.get(
  "/reviews/my-reviews",
  auth,
  restrict(["doctor"]),
  myReviews
);
// router.get(
//   "/qualifications/my-qualification",
//   authenticate,
//   restrict(["doctor"]),
//   myQualifications
// );
// router.get(
//   "/experiences/my-experience/:id",
//   authenticate,
//   restrict(["doctor"]),
//   myExperience
// );

export default router;
