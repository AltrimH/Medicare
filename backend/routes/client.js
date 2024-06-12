import express from "express";
import { getDoctors, getDoctor, updateDoctor, deleteDoctor } from "../controllers/doctorController.js";
import { getPatients, getPatient, createUpdatePatient, deletePatient } from "../controllers/patientController.js";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/userController.js";
// import { getAllReviews } from "../controllers/reviewController";

const router = express.Router()

// Doctors
router.get('/doctors', getDoctors)
router.get('/doctors/:id', getDoctor)
router.put('/doctors/:id', updateDoctor)
router.delete('/doctors/:id', deleteDoctor)

// Patients
router.get('/patients', getPatients)
router.get('/patients/:id', getPatient)
router.put('/patients/:id', createUpdatePatient)
router.delete('/patient/:id', deletePatient)

// Users
router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

// Appointments
// router.get('/appointments', getAppointments)
// router.get('/appointments/:id', getAppointment)
// router.put('/appointments/:id', updateAppointments)
// router.delete('/appointments/:id', deleteAppointments)

// Reviews
// router.get('/reviews', getReviews)
// router.get('/reviews/:id', getReview)
// router.put('/reviews/:id', updateReview)
// router.delete('/reviews/:id', deleteReview)

// Contacts
// router.get('/contacts', getContacts)
// router.get('/contacts/:id', getContact)
// router.put('/contacts/:id', updateContact)
// router.delete('/contacts/:id', deleteContact)

export default router