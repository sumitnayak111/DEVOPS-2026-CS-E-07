import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

function BookAppointment() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    appointmentDate: "",

    appointmentTime: "",

    reason: "",
  });

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/doctors/${id}`);

      setDoctor(res.data.data);
    } catch (err) {
      console.error("Doctor Error:", err);

      setError(err.response?.data?.message || "Unable to load doctor.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/appointments", {
        doctor: id,

        appointmentDate: formData.appointmentDate,

        appointmentTime: formData.appointmentTime,

        reason: formData.reason,
      });

      // Go to Appointment Success page

      navigate("/appointment-success", {
        state: {
          appointment: res.data.data,
        },
      });
    } catch (err) {
      console.error("Appointment Error:", err);

      alert(err.response?.data?.message || "Failed to book appointment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-600">Loading doctor...</p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600">{error || "Doctor not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Book Appointment
        </h1>

        {/* Doctor Information */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <img
              src={
                doctor.image
                  ? `http://localhost:8000${doctor.image}`
                  : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500"
              }
              alt={doctor.name}
              className="w-28 h-28 rounded-full object-cover"
            />

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Dr. {doctor.name}
              </h2>

              <p className="text-blue-600 font-semibold mt-1">
                {doctor.specialization}
              </p>

              <p className="text-gray-600 mt-1">{doctor.qualification}</p>

              <p className="text-gray-600 mt-1">
                Experience: {doctor.experience} years
              </p>

              <p className="text-gray-600 mt-1">
                Consultation Fee: ₹{doctor.consultationFee}
              </p>
            </div>
          </div>
        </div>

        {/* Appointment Form */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Appointment Details
          </h2>

          {/* Date + Time */}

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Appointment Date
              </label>

              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                min={
                  new Date()

                    .toISOString()

                    .split("T")[0]
                }
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Appointment Time
              </label>

              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
          </div>

          {/* Reason */}

          <div className="mt-5">
            <label className="block text-gray-700 font-medium mb-2">
              Reason for Appointment
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason for appointment..."
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-6"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
