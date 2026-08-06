import { useEffect, useState } from "react";
import API from "../services/api";
function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, []);
  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });
      alert("Appointment Updated Successfully");
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Manage Appointments
      </h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border p-2">Patient</th>
            <th className="border p-2">Doctor</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="border p-2">
                {appointment.patient?.name}
              </td>
              <td className="border p-2">
                {appointment.doctor?.name}
              </td>
              <td className="border p-2">
                {new Date(
                  appointment.appointmentDate
                ).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {appointment.appointmentTime}
              </td>
              <td className="border p-2">
                <select
                  value={appointment.status}
                  onChange={(e) =>
                    updateStatus(
                      appointment._id,
                      e.target.value
                    )
                  }
                  className="border rounded p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminAppointments;