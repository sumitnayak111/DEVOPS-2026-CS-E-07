const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    symptoms: {
      type: String,
      default: "",
      trim: true,
    },

    prescription: {
      type: String,
      default: "",
      trim: true,
    },

    medicines: {
      type: String,
      default: "",
      trim: true,
    },

    doctorNotes: {
      type: String,
      default: "",
      trim: true,
    },

    followUpDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);