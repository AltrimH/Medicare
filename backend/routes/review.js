import express from "express";
import {
  getAllReviews,
  createReview,
} from "../controllers/reviewController.js";

import { auth, restrict } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(auth, restrict(["patient"]), createReview);

export default router;
