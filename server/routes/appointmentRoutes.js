const express = require("express");

const router = express.Router();

const {

  bookAppointment,

  getAppointments,

  getAppointmentById,

  updateAppointmentStatus,

  deleteAppointment,

  getMyAppointments,

  cancelAppointment,

} = require("../controllers/appointmentController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Patient books appointment

router.post("/", protect, bookAppointment);

// Admin views all appointments

router.get("/", protect, authorize("admin"), getAppointments);

// Get appointment by ID
router.get("/my", protect, getMyAppointments);

router.get("/:id", protect, getAppointmentById);

// Admin updates appointment status

router.put("/:id", protect, authorize("admin"), updateAppointmentStatus);

// Patient cancels their own appointment — NEW

router.patch("/:id/cancel", protect, cancelAppointment);

// Admin deletes appointment

router.delete("/:id", protect, authorize("admin"), deleteAppointment);

module.exports = router;
