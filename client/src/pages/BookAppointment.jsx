import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointments", {
        doctor: id,
        appointmentDate,
        appointmentTime,
        reason,
      });
      alert("Appointment Booked Successfully!");
      navigate("/appointments");
    } catch (err) {
      alert(err.response?.data?.message || "Booking Failed");
    }
  };
  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Book Appointment
        </h1>
        <input
          type="date"
          className="w-full border p-3 rounded mb-4"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
        <input
          type="time"
          className="w-full border p-3 rounded mb-4"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
        <textarea
          placeholder="Reason for Appointment"
          className="w-full border p-3 rounded mb-4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
export default BookAppointment;