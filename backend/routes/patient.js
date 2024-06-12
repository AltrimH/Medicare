import express from "express";

import {
  createPatient,
  getPatient,
  getPatients,
  createUpdatePatient,
  deletePatient,
  getAppointments
} from "../controllers/patientController.js";

import { auth, restrict } from '../middleware/auth.js'

const router = express.Router();

router.get("/", getPatients);
router.get("/:id", getPatient);

router.post("/", createPatient);
router.put("/:id", auth, createUpdatePatient);
router.delete("/:id", deletePatient);

router.get('/appointments/me', auth, restrict(['patient']), getAppointments)

export default router;
