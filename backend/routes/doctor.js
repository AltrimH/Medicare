import express from "express";
import {
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
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

export default router;
