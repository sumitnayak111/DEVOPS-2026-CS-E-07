const express = require("express");

const router = express.Router();

const {
  createMedicalRecord,
  getMedicalRecords,
  getMyMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// =====================================================
// ADMIN ROUTES
// =====================================================

// Create medical record
router.post(
  "/",
  protect,
  authorize("admin"),
  createMedicalRecord
);

// Get all medical records
router.get(
  "/",
  protect,
  authorize("admin"),
  getMedicalRecords
);

// Update medical record
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateMedicalRecord
);

// Delete medical record
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteMedicalRecord
);

// =====================================================
// PATIENT ROUTES
// =====================================================

// Patient gets own medical records
router.get(
  "/my",
  protect,
  authorize("patient"),
  getMyMedicalRecords
);

// Patient/Admin gets one medical record
router.get(
  "/:id",
  protect,
  authorize("admin", "patient"),
  getMedicalRecordById
);

module.exports = router;