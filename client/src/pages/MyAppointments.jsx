import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/appointments/my");

      setAppointments(res.data?.data || []);
    } catch (err) {
      console.log("Appointments Error:", err);

      setError(
        err.response?.data?.message || "Unable to load your appointments.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              My Appointments
            </h1>

            <p className="text-gray-500 mt-2">
              View and track your appointments.
            </p>
          </div>

          <Link
            to="/doctors"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Book New Appointment
          </Link>
        </div>

        {/* Loading */}

        {loading && (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-xl text-gray-600">Loading appointments...</p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="bg-red-100 text-red-700 rounded-xl p-6 text-center">
            <p>{error}</p>

            <button
              onClick={fetchAppointments}
              className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No appointments */}

        {!loading && !error && appointments.length === 0 && (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              No Appointments
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't booked any appointments yet.
            </p>

            <Link
              to="/doctors"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Find a Doctor
            </Link>
          </div>
        )}

        {/* Appointment Cards */}

        {!loading && !error && appointments.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                {/* Doctor */}

                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Dr. {appointment.doctor?.name || "Doctor"}
                    </h2>

                    <p className="text-blue-600 font-semibold mt-1">
                      {appointment.doctor?.specialization || "Specialist"}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                      appointment.status,
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="border-t mt-5 pt-5 space-y-3">
                  {/* Date */}

                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>

                    <span className="font-semibold">
                      {new Date(
                        appointment.appointmentDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Time */}

                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>

                    <span className="font-semibold">
                      {appointment.appointmentTime}
                    </span>
                  </div>

                  {/* Fee */}

                  <div className="flex justify-between">
                    <span className="text-gray-500">Consultation Fee</span>

                    <span className="font-semibold text-blue-600">
                      ₹{appointment.doctor?.consultationFee || 0}
                    </span>
                  </div>

                  {/* Reason */}

                  <div>
                    <span className="text-gray-500">Reason</span>

                    <p className="mt-1 text-gray-700">
                      {appointment.reason || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
