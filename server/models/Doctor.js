const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,
    },

    specialization: {
      type: String,

      required: true,
    },

    qualification: {
      type: String,

      required: true,
    },

    experience: {
      type: Number,

      required: true,
    },

    phone: {
      type: String,

      required: true,
    },

    email: {
      type: String,

      required: true,

      unique: true,
    },

    consultationFee: {
      type: Number,

      required: true,
    },

    availableDays: {
      type: [String],

      default: [],
    },

    availableTime: {
      type: String,
    },

    // Doctor profile image

    image: {
      type: String,

      default: "",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Doctor", doctorSchema);
