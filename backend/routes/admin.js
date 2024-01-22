import express from "express";
import {
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminProfile,
} from "../controllers/adminController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/", authenticate, restrict(["admin"]), getAdmins);
router.get("/:id", authenticate, restrict(["admin"]), getAdmin);
router.put("/:id", authenticate, restrict(["admin"]), updateAdmin);
router.delete("/:id", authenticate, restrict(["admin"]), deleteAdmin);
router.get("/profile/me", authenticate, restrict(["admin"]), getAdminProfile);

export default router;
