import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

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

  // Cancel appointment handler
  const handleCancel = async (id) => {
    try {
      setCancellingId(id);
      await API.patch(`/appointments/${id}/cancel`);
      // Update status locally — no need to refetch
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "Rejected" } : appt
        )
      );
      setConfirmId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel appointment.");
    } finally {
      setCancellingId(null);
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

                {/* Cancel Button — only for Pending appointments */}
                {appointment.status === "Pending" && (
                  <div className="mt-5">
                    {confirmId === appointment._id ? (
                      // Confirmation dialog
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 font-semibold text-sm mb-3">
                          Are you sure you want to cancel this appointment?
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleCancel(appointment._id)}
                            disabled={cancellingId === appointment._id}
                            className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-60"
                          >
                            {cancellingId === appointment._id
                              ? "Cancelling..."
                              : "Yes, Cancel"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                          >
                            No, Keep It
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(appointment._id)}
                        className="w-full border-2 border-red-500 text-red-500 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
