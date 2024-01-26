import express from "express";
import {
    getAllExperiences,
    createExperience,
} from "../controllers/experienceController.js";

import { authenticate, restrict } from "./../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  authenticate,
  restrict(["doctor", "admin"]),
  getAllExperiences
);
router.post(
  "/add-experience",
  authenticate,
  restrict(["doctor", "admin"]),
  createExperience
);

export default router;
