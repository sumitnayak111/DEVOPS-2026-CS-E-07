import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { FaCalendarAlt, FaUserMd, FaUserCircle, FaClock } from "react-icons/fa";

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, appointmentRes] = await Promise.all([
        API.get("/auth/profile"),
        API.get("/appointments/my"),
      ]);
      setUser(profileRes.data.data);
      setAppointments(appointmentRes.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const pending   = appointments.filter((a) => a.status === "Pending").length;
  const approved  = appointments.filter((a) => a.status === "Approved").length;
  const completed = appointments.filter((a) => a.status === "Completed").length;
  const cancelled = appointments.filter((a) => a.status === "Rejected").length;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-xl text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Welcome Header */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-4">
            <FaUserCircle size={60} className="opacity-90" />
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user?.name || "Patient"}!
              </h1>
              <p className="text-blue-100 mt-1">{user?.email}</p>
              <span className="inline-block mt-2 bg-white text-blue-600 text-sm font-semibold px-3 py-1 rounded-full capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-yellow-500">{pending}</p>
            <p className="text-gray-500 mt-1 text-sm">Pending</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-green-500">{approved}</p>
            <p className="text-gray-500 mt-1 text-sm">Approved</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-blue-500">{completed}</p>
            <p className="text-gray-500 mt-1 text-sm">Completed</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-red-500">{cancelled}</p>
            <p className="text-gray-500 mt-1 text-sm">Cancelled</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/doctors"
            className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
          >
            <FaUserMd className="text-blue-600 text-4xl mx-auto mb-3" />
            <h3 className="font-bold text-gray-800">Find Doctor</h3>
            <p className="text-gray-500 text-sm mt-1">Search and book appointments</p>
          </Link>
          <Link
            to="/appointments"
            className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
          >
            <FaCalendarAlt className="text-blue-600 text-4xl mx-auto mb-3" />
            <h3 className="font-bold text-gray-800">My Appointments</h3>
            <p className="text-gray-500 text-sm mt-1">View and manage appointments</p>
          </Link>
          <Link
            to="/profile"
            className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
          >
            <FaUserCircle className="text-blue-600 text-4xl mx-auto mb-3" />
            <h3 className="font-bold text-gray-800">My Profile</h3>
            <p className="text-gray-500 text-sm mt-1">View and edit your profile</p>
          </Link>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Appointments
            </h2>
            <Link to="/appointments" className="text-blue-600 text-sm hover:underline">
              View All →
            </Link>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <FaClock className="text-gray-300 text-5xl mx-auto mb-3" />
              <p className="text-gray-500">No appointments yet.</p>
              <Link
                to="/doctors"
                className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Book First Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.slice(0, 3).map((appt) => (
                <div key={appt._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Dr. {appt.doctor?.name || "Doctor"}
                    </p>
                    <p className="text-sm text-blue-600">{appt.doctor?.specialization}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(appt.appointmentDate).toLocaleDateString("en-IN")} at {appt.appointmentTime}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    appt.status === "Approved"  ? "bg-green-100 text-green-700" :
                    appt.status === "Rejected"  ? "bg-red-100 text-red-700" :
                    appt.status === "Completed" ? "bg-blue-100 text-blue-700" :
                                                  "bg-yellow-100 text-yellow-700"
                  }`}>
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default PatientDashboard;