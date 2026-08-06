import { Link } from "react-router-dom";
function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged Out Successfully");
    window.location.href = "/login";

  };
  const token = localStorage.getItem("token");
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Hospital Management System
      </h1>
      <div className="space-x-5">
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/appointments">My Appointments</Link>
            <Link to="/admin">Admin</Link>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;