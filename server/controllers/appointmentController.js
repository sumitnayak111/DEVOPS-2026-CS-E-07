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

// Cancel Appointment (Patient) — NEW
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
 
    // Check appointment exists
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment Not Found" });
    }
 
    // Check appointment belongs to this patient
    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to cancel this appointment" });
    }
 
    // Only Pending appointments can be cancelled
    if (appointment.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel an appointment that is already ${appointment.status}`,
      });
    }
 
     // Update status to Rejected (Cancelled)
    appointment.status = "Rejected";
    await appointment.save();
 
    res.status(200).json({
      success: true,
      message: "Appointment Cancelled Successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {

  bookAppointment,

  getAppointments,

  getAppointmentById,

  updateAppointmentStatus,

  deleteAppointment,

  getMyAppointments,

  cancelAppointment,

};