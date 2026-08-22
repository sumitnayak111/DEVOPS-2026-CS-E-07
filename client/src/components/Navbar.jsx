import { Link, useNavigate } from "react-router-dom";
import { FaHospital, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <FaHospital />
          <span>HospitalMS</span>
        </Link>
        {/* Menu */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>
          <Link
            to="/doctors"
            className="hover:text-yellow-300 transition"
          >
            Doctors
          </Link>
          {token && role === "patient" && (
            <Link
              to="/appointments"
              className="hover:text-yellow-300 transition"
            >
              My Appointments
            </Link>
          )}
          {token && role === "admin" && (
            <>
              <Link
                to="/admin"
                className="hover:text-yellow-300 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/appointments"
                className="hover:text-yellow-300 transition"
              >
                Appointments
              </Link>
            </>
          )}
          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <FaUserCircle size={28} />
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;