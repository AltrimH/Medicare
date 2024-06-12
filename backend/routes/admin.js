import express from "express";
import {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminProfile,
} from "../controllers/adminController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/profile/me", authenticate, restrict(["admin"]), getAdminProfile);

router.get("/", getAdmins);
router.get("/:id", authenticate, restrict(["admin"]), getAdmin);

router.post('/', authenticate, restrict(["admin"]), createAdmin)
router.put("/:id", authenticate, restrict(["admin"]), updateAdmin);
router.delete("/:id", authenticate, restrict(["admin"]), deleteAdmin);

export default router;
