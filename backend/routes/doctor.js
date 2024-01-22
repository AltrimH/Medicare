import express from "express";
import {
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorProfile,
  myReviews,
} from "../controllers/doctorController.js";

import reviewRouter from "./review.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);

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

export default router;
