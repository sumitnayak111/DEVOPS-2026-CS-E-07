import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);
  const fetchDoctor = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/doctors/${doctorId}`);
      setDoctor(res.data.data);
    } catch (err) {
      console.log(err);
      setError("Unable to load doctor details.");
    } finally {
      setLoading(false);
    }
  };
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert("Please select appointment date and time.");
      return;
    }
    try {
      setBooking(true);
      const res = await API.post("/appointments", {
        doctorId,
        appointmentDate: date,
        appointmentTime: time,
      });
      alert(res.data.message || "Appointment booked successfully!");
      navigate("/appointments");
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Unable to book appointment. Please try again."
      );
    } finally {
      setBooking(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl">Loading doctor details...</p>
      </div>
    );
  }
  if (error || !doctor) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            {error || "Doctor not found"}
          </h2>
          <button
            onClick={() => navigate("/doctors")}
            className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Book Your Appointment
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Doctor Information */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={
                doctor.image ||
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500"
              }
              alt={doctor.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold">
                Dr. {doctor.name}
              </h2>
              <p className="text-blue-600 font-semibold mt-2">
                {doctor.specialization}
              </p>
              <p className="text-gray-600 mt-3">
                Qualification: {doctor.qualification}
              </p>
              <p className="text-gray-600 mt-2">
                Experience: {doctor.experience} Years
              </p>
              <p className="text-gray-600 mt-2">
                Consultation Fee: ₹{doctor.consultationFee}
              </p>
              <p className="text-gray-600 mt-2">
                Available Time: {doctor.availableTime || "Contact hospital"}
              </p>
            </div>
          </div>
          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              Appointment Details
            </h2>
            <form onSubmit={handleBooking}>
              <div className="mb-5">
                <label className="block font-medium mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block font-medium mb-2">
                  Select Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  required
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-5">
                <p className="text-gray-700">
                  Consultation Fee
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{doctor.consultationFee}
                </p>
              </div>
              <button
                type="submit"
                disabled={booking}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {booking ? "Booking Appointment..." : "Confirm Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookAppointment;