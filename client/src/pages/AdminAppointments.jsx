import { useEffect, useState } from "react";

import API from "../services/api";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const res = await API.get("/appointments");

      setAppointments(res.data?.data || []);
    } catch (err) {
      console.log("Appointments Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });

      alert(`Appointment ${status}`);

      fetchAppointments();
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Unable to update appointment");
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/appointments/${id}`);

      alert("Appointment deleted successfully");

      fetchAppointments();
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Unable to delete appointment");
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Manage Appointments
        </h1>

        <p className="text-gray-500 mb-8">
          View and manage all patient appointments.
        </p>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-xl text-gray-600">Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">No Appointments</h2>

            <p className="text-gray-500 mt-2">
              There are currently no appointments.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left">Patient</th>

                  <th className="p-4 text-left">Doctor</th>

                  <th className="p-4 text-left">Date</th>

                  <th className="p-4 text-left">Time</th>

                  <th className="p-4 text-left">Reason</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <p className="font-semibold">
                        {appointment.patient?.name || "Unknown"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {appointment.patient?.email || ""}
                      </p>
                    </td>

                    <td className="p-4">
                      <p className="font-semibold">
                        Dr. {appointment.doctor?.name || "Unknown"}
                      </p>

                      <p className="text-sm text-blue-600">
                        {appointment.doctor?.specialization || ""}
                      </p>
                    </td>

                    <td className="p-4">
                      {new Date(
                        appointment.appointmentDate,
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">{appointment.appointmentTime}</td>

                    <td className="p-4 max-w-xs">
                      {appointment.reason || "Not provided"}
                    </td>

                    <td className="p-4">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          updateStatus(
                            appointment._id,

                            e.target.value,
                          )
                        }
                        className={`px-3 py-2 rounded-lg font-semibold ${getStatusClass(
                          appointment.status,
                        )}`}
                      >
                        <option value="Pending">Pending</option>

                        <option value="Approved">Approved</option>

                        <option value="Rejected">Rejected</option>

                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteAppointment(appointment._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAppointments;
