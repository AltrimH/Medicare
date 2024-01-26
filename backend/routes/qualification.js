import express from "express";
import {
  getAllQualifications,
  createQualification,
} from "../controllers/qualificationController.js";

import { authenticate, restrict } from "./../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  authenticate,
  restrict(["doctor", "admin"]),
  getAllQualifications
);
router.post(
  "/add-qualification",
  authenticate,
  restrict(["doctor", "admin"]),
  createQualification
);

export default router;
