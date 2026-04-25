import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getBookedSlots,
} from "../controllers/appointmentController.js";

const router = express.Router();


//CREATE APPOINTMENT
router.post("/", protect, createAppointment);


//GET ALL USER APPOINTMENTS
router.get("/", protect, getAppointments);


// UPDATE APPOINTMENT
router.put("/:id", protect, updateAppointment);


//DELETE APPOINTMENT
router.delete("/:id", protect, deleteAppointment);


//GET BOOKED SLOTS (for slot blocking)
router.get("/slots/:doctorId", protect, getBookedSlots);


export default router;