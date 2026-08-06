const Appointment = require("../models/Appointment");

// Book Appointment

const bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({

  ...req.body,

  patient: req.user.id,

});

    res.status(201).json({
      success: true,

      message: "Appointment Booked Successfully",

      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get All Appointments

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()

      .populate("patient", "name email")

      .populate("doctor", "name specialization");

    res.status(200).json({
      success: true,

      count: appointments.length,

      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })

      .populate("doctor", "name specialization consultationFee")

      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,

      count: appointments.length,

      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get Appointment by ID

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)

      .populate("patient", "name email")

      .populate("doctor", "name specialization");

    if (!appointment) {
      return res.status(404).json({
        success: false,

        message: "Appointment Not Found",
      });
    }

    res.status(200).json({
      success: true,

      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Update Appointment Status

const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,

      { status: req.body.status },

      { new: true },
    );

    res.status(200).json({
      success: true,

      message: "Appointment Updated Successfully",

      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Delete Appointment

const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,

      message: "Appointment Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {

  bookAppointment,

  getAppointments,

  getAppointmentById,

  updateAppointmentStatus,

  deleteAppointment,

  getMyAppointments,

};