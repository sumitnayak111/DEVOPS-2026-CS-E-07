import { Link, useLocation } from "react-router-dom";

function AppointmentSuccess() {
  const location = useLocation();

  const appointment = location.state?.appointment;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        {/* Success Icon */}

        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
          ✓
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mt-5">
          Appointment Booked!
        </h1>

        <p className="text-gray-500 mt-2">
          Your appointment has been successfully booked.
        </p>

        {/* Appointment Details */}

        {appointment && (
          <div className="text-left bg-gray-50 rounded-xl p-5 mt-6 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Appointment Details
            </h2>

            <p>
              <span className="font-semibold">Doctor:</span> Dr.{" "}
              {appointment.doctor?.name || "Doctor"}
            </p>

            <p>
              <span className="font-semibold">Specialization:</span>{" "}
              {appointment.doctor?.specialization || "Specialist"}
            </p>

            <p>
              <span className="font-semibold">Date:</span>{" "}
              {appointment.appointmentDate
                ? new Date(appointment.appointmentDate).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <span className="font-semibold">Time:</span>{" "}
              {appointment.appointmentTime || "N/A"}
            </p>

            <p>
              <span className="font-semibold">Reason:</span>{" "}
              {appointment.reason || "N/A"}
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-yellow-600 font-semibold">
                {appointment.status || "Pending"}
              </span>
            </p>
          </div>
        )}

        {/* Buttons */}

        <div className="flex flex-col gap-3 mt-7">
          <Link
            to="/appointments"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            My Appointments
          </Link>

          <Link
            to="/doctors"
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold"
          >
            Find Another Doctor
          </Link>

          <Link
            to="/patient"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Patient Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AppointmentSuccess;
