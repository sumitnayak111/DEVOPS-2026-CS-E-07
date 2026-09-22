const express = require("express");

const router = express.Router();

const {

  addDoctor,

  getDoctors,

  getDoctorById,

  updateDoctor,

  deleteDoctor,

} = require("../controllers/doctorController");

const { protect, authorize } = require("../middleware/authMiddleware");

const uploadDoctorImage = require("../middleware/uploadDoctorImage");

// Add Doctor

router.post(

  "/",

  protect,

  authorize("admin"),

  uploadDoctorImage.single("image"),

  addDoctor,

);

// Get all doctors

router.get("/", getDoctors);

// Get doctor by ID

router.get("/:id", protect, getDoctorById);

// Update doctor

router.put(

  "/:id",

  protect,

  authorize("admin"),

  uploadDoctorImage.single("image"),

  updateDoctor,

);

// Delete doctor

router.delete("/:id", protect, authorize("admin"), deleteDoctor);

module.exports = router;