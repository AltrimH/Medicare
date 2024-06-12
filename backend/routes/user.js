import express from "express";
import {
  getProfile,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyAppointments,
} from "../controllers/userController.js";

import { auth, restrict } from "../middleware/auth.js";

const router = express.Router();

// user/patient profile
router.get("/profile", auth, restrict(["user", "patient"]), getProfile);

router.get("/", auth, restrict(["admin", "superadmin"]), getUsers);
router.get("/:id", auth, restrict(["admin", "superadmin"]), getUser);
router.put(
  "/:id",
  auth,
  restrict(["user", "patient", "admin", "superadmin"]),
  updateUser
);
router.delete(
  "/:id",
  auth,
  restrict(["user", "patient", "admin", "superadmin"]),
  deleteUser
);

// router.get(
//   "/appointments/my-appointments",
//   authenticate,
//   restrict(["patient"]),
//   getMyAppointments
// );

export default router;
