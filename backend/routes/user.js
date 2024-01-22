import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyAppointments,
  getUserProfile,
} from "../controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/", authenticate, restrict(["admin"]), getUsers);
router.get("/:id", authenticate, restrict(["patient"]), getUser);
router.put("/:id", authenticate, restrict(["patient"]), updateUser);
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router;
