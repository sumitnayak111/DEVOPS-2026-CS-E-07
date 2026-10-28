import { useEffect, useState } from "react";

import API from "../services/api";

import DoctorForm from "../components/DoctorForm";

function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      setError("");

      const res = await API.get("/doctors");

      console.log("Doctors API Response:", res.data);

      setDoctors(res.data.data || []);
    } catch (err) {
      console.error("Error fetching doctors:", err);

      setError(err.response?.data?.message || "Failed to load doctors");

      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDoctorAdded = () => {
    fetchDoctors();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/doctors/${id}`);

      alert("Doctor deleted successfully");

      fetchDoctors();
    } catch (err) {
      console.error("Delete error:", err);

      alert(err.response?.data?.message || "Failed to delete doctor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

          <p className="text-gray-600 mt-2">
            Manage doctors and hospital services
          </p>
        </div>

        {/* System Monitoring & Observability */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-md p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="bg-yellow-400 text-blue-900 text-xs uppercase font-extrabold px-2.5 py-1 rounded">DevOps Monitoring</span>
              <h2 className="text-2xl font-bold mt-2">Prometheus & Grafana Observability</h2>
              <p className="text-blue-200 text-sm mt-1">
                Monitor backend HTTP latency, error rates, in-flight requests, and Node.js runtime metrics.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow flex items-center gap-2"
              >
                📊 Grafana Dashboard (3001)
              </a>
              <a
                href="http://localhost:9090"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow flex items-center gap-2"
              >
                🔥 Prometheus UI (9090)
              </a>
              <a
                href="/monitoring"
                className="bg-white hover:bg-gray-100 text-blue-900 px-4 py-2 rounded-lg font-semibold text-sm transition shadow"
              >
                View Embedded
              </a>
            </div>
          </div>
        </div>

        {/* Add Doctor */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Doctor
          </h2>

          <DoctorForm onDoctorAdded={handleDoctorAdded} />
        </div>

        {/* Doctors */}

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Doctors</h2>

              <p className="text-gray-500 mt-1">
                Total Doctors: {doctors.length}
              </p>
            </div>
          </div>

          {loading && (
            <p className="text-center text-gray-500 py-8">Loading doctors...</p>
          )}

          {!loading && error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !error && doctors.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">No doctors found.</p>

              <p className="text-sm mt-2">Add a doctor using the form above.</p>
            </div>
          )}

          {!loading && !error && doctors.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-4 border-b">Doctor</th>

                    <th className="p-4 border-b">Specialization</th>

                    <th className="p-4 border-b">Experience</th>

                    <th className="p-4 border-b">Fee</th>

                    <th className="p-4 border-b">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor._id} className="hover:bg-gray-50">
                      <td className="p-4 border-b">
                        <div className="font-semibold text-gray-800">
                          {doctor.name}
                        </div>

                        <div className="text-sm text-gray-500">
                          {doctor.email}
                        </div>
                      </td>

                      <td className="p-4 border-b">{doctor.specialization}</td>

                      <td className="p-4 border-b">
                        {doctor.experience} years
                      </td>

                      <td className="p-4 border-b">
                        ₹{doctor.consultationFee}
                      </td>

                      <td className="p-4 border-b">
                        <button
                          onClick={() => handleDelete(doctor._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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
    </div>
  );
}

export default AdminDashboard;
