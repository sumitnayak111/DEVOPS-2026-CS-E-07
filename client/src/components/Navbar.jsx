import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("role");

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}

        <Link to="/" className="text-xl md:text-2xl font-bold">
          Hospital Management System
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-5">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>

          <Link to="/doctors" className="hover:text-yellow-300 transition">
            Doctors
          </Link>

          <Link to="/contact" className="hover:text-yellow-300 transition">
            Contact
          </Link>

          {/* Logged Out */}

          {!token && (
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
          )}

          {/* Patient */}

          {token && role === "patient" && (
            <>
              <Link
                to="/appointments"
                className="hover:text-yellow-300 transition"
              >
                My Appointments
              </Link>

              <Link to="/patient" className="hover:text-yellow-300 transition">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            </>
          )}

          {/* Admin */}

          {token && role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-yellow-300 transition">
                Admin Dashboard
              </Link>

              <Link
                to="/admin/appointments"
                className="hover:text-yellow-300 transition"
              >
                Appointments
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
