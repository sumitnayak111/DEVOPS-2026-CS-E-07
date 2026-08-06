import { useEffect, useState } from "react";
import API from "../services/api";
import DoctorForm from "../components/DoctorForm";
function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);
  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (!confirmDelete) return;
    try {
      await API.delete(`/doctors/${id}`);
      alert("Doctor Deleted Successfully");
      fetchDoctors();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-blue-600 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Doctors</h2>
          <p className="text-3xl">{doctors.length}</p>
        </div>
        <div className="bg-green-600 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Appointments</h2>
          <p className="text-3xl">{appointments.length}</p>
        </div>
        <div className="bg-yellow-500 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-3xl">
            {
              appointments.filter(
                (appointment) => appointment.status === "Pending"
              ).length
            }
          </p>
        </div>
        <div className="bg-red-600 text-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Completed</h2>
          <p className="text-3xl">
            {
              appointments.filter(
                (appointment) => appointment.status === "Completed"
              ).length
            }
          </p>
        </div>
      </div>
      <DoctorForm onDoctorAdded={fetchDoctors} />
      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border p-2">Name</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Experience</th>
            <th className="border p-2">Fees</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td className="border p-2">{doctor.name}</td>
              <td className="border p-2">{doctor.specialization}</td>
              <td className="border p-2">{doctor.experience}</td>
              <td className="border p-2">
                ₹{doctor.consultationFee}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => deleteDoctor(doctor._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminDashboard;