const express = require("express");

const router = express.Router();

const {
  addDoctor,

  getDoctors,

  getDoctorById,

  updateDoctor,

  deleteDoctor,
} = require("../controllers/doctorController");

const {
  protect,

  authorize,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// Add Doctor with image

router.post(
  "/",

  protect,

  authorize("admin"),

  upload.single("image"),

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

  updateDoctor,
);

// Delete doctor

router.delete(
  "/:id",

  protect,

  authorize("admin"),

  deleteDoctor,
);

module.exports = router;
