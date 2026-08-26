const MedicalRecord = require("../models/MedicalRecord");
const Appointment = require("../models/Appointment");

// =====================================================
// CREATE MEDICAL RECORD
// Admin can create a medical record for a completed
// appointment.
// =====================================================

const createMedicalRecord = async (req, res) => {
  try {
    const {
      appointment,
      diagnosis,
      symptoms,
      prescription,
      medicines,
      doctorNotes,
      followUpDate,
    } = req.body;

    if (!appointment || !diagnosis) {
      return res.status(400).json({
        success: false,
        message: "Appointment and diagnosis are required",
      });
    }

    // Find appointment
    const existingAppointment = await Appointment.findById(appointment);

    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Medical record should only be created for completed appointments
    if (existingAppointment.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message:
          "Medical record can only be created for completed appointments",
      });
    }

    // Check whether record already exists
    const existingRecord = await MedicalRecord.findOne({
      appointment,
    });

    if (existingRecord) {
      return res.status(400).json({
        success: false,
        message: "Medical record already exists for this appointment",
      });
    }

    const medicalRecord = await MedicalRecord.create({
      appointment: existingAppointment._id,
      patient: existingAppointment.patient,
      doctor: existingAppointment.doctor,
      diagnosis,
      symptoms,
      prescription,
      medicines,
      doctorNotes,
      followUpDate: followUpDate || null,
    });

    const populatedRecord = await MedicalRecord.findById(
      medicalRecord._id
    )
      .populate("patient", "name email")
      .populate("doctor", "name specialization")
      .populate(
        "appointment",
        "appointmentDate appointmentTime status reason"
      );

    res.status(201).json({
      success: true,
      message: "Medical Record Created Successfully",
      data: populatedRecord,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================================
// GET ALL MEDICAL RECORDS
// Admin only
// =====================================================

const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization")
      .populate(
        "appointment",
        "appointmentDate appointmentTime status reason"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET MY MEDICAL RECORDS
// Patient sees only his/her own records
// =====================================================

const getMyMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patient: req.user.id,
    })
      .populate("doctor", "name specialization qualification")
      .populate(
        "appointment",
        "appointmentDate appointmentTime status reason"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET MEDICAL RECORD BY ID
// Admin or owner patient
// =====================================================

const getMedicalRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate("patient", "name email")
      .populate("doctor", "name specialization qualification")
      .populate(
        "appointment",
        "appointmentDate appointmentTime status reason"
      );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical Record Not Found",
      });
    }

    // Patient can only see own record
    if (
      req.user.role === "patient" &&
      record.patient._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================================
// UPDATE MEDICAL RECORD
// Admin only
// =====================================================

const updateMedicalRecord = async (req, res) => {
  try {
    const {
      diagnosis,
      symptoms,
      prescription,
      medicines,
      doctorNotes,
      followUpDate,
    } = req.body;

    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      {
        diagnosis,
        symptoms,
        prescription,
        medicines,
        doctorNotes,
        followUpDate: followUpDate || null,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("patient", "name email")
      .populate("doctor", "name specialization")
      .populate(
        "appointment",
        "appointmentDate appointmentTime status reason"
      );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical Record Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medical Record Updated Successfully",
      data: record,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE MEDICAL RECORD
// Admin only
// =====================================================

const deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical Record Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medical Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMedicalRecord,
  getMedicalRecords,
  getMyMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
};