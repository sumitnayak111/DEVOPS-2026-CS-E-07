import { useEffect, useState } from "react";
import API from "../services/api";
function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, []);
  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border p-2">Doctor</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="border p-2">
                {appointment.doctor?.name}
              </td>
              <td className="border p-2">
                {appointment.doctor?.specialization}
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
                {appointment.reason}
              </td>
              <td className="border p-2">
                {appointment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MyAppointments;