import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function AppointmentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const details = location.state;

  // If someone visits this page directly without booking, redirect them
  useEffect(() => {
    if (!details) {
      navigate("/doctors");
    }
  }, [details, navigate]);

  if (!details) return null;

  const formattedDate = new Date(details.appointmentDate).toLocaleDateString(
    "en-IN",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  const formattedTime = (() => {
    const [hour, minute] = details.appointmentTime.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minute} ${ampm}`;
  })();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Success Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-5xl">✅</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Appointment Booked!
          </h1>
          <p className="text-gray-500">
            Your appointment has been confirmed. Please arrive 10 minutes early.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b">
            📋 Booking Summary
          </h2>

          <div className="space-y-4">
            {/* Doctor */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Doctor</span>
              <span className="font-bold text-gray-800">
                Dr. {details.doctorName}
              </span>
            </div>

            {/* Specialization */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Specialization</span>
              <span className="font-semibold text-blue-600">
                {details.specialization}
              </span>
            </div>

            {/* Date */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Date</span>
              <span className="font-semibold text-gray-800">{formattedDate}</span>
            </div>

            {/* Time */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Time</span>
              <span className="font-semibold text-gray-800">{formattedTime}</span>
            </div>

            {/* Reason */}
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-medium">Reason</span>
              <span className="font-semibold text-gray-800 text-right max-w-xs">
                {details.reason}
              </span>
            </div>

            {/* Fee */}
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-gray-700 font-semibold">Consultation Fee</span>
              <span className="text-2xl font-bold text-blue-600">
                ₹{details.consultationFee}
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">⏳</span>
          <div>
            <p className="font-semibold text-yellow-700">Status: Pending Approval</p>
            <p className="text-yellow-600 text-sm">
              The hospital will review and confirm your appointment shortly.
            </p>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold text-blue-700">Important</p>
            <p className="text-blue-600 text-sm">
              Please carry a valid ID and any previous medical reports to your appointment.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/appointments"
            className="block text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            View My Appointments
          </Link>
          <Link
            to="/doctors"
            className="block text-center border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Book Another Appointment
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AppointmentSuccess;