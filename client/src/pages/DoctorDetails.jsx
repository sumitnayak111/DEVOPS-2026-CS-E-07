import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchDoctor();
  }, [id]);
  const fetchDoctor = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/doctors/${id}`);
      setDoctor(res.data.data);
    } catch (err) {
      console.log(err);
      setError("Unable to load doctor details.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl">Loading doctor details...</h2>
      </div> );

  }
  if (error || !doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl text-red-600">
          {error || "Doctor not found"}
        </h2>
        <Link
          to="/doctors"
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back to Doctors
        </Link>
      </div>
    );
  }
  const image = doctor.image
    ? `http://localhost:8000${doctor.image}`
    : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500";
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Doctor Image */}
          <div className="bg-blue-50 p-8 flex items-center justify-center">
            <img
              src={image}
              alt={doctor.name}
              className="w-full max-w-sm h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
          {/* Doctor Details */}
          <div className="p-8">
            <p className="text-blue-600 font-semibold">
              {doctor.specialization}
            </p>
            <h1 className="text-4xl font-bold text-gray-800 mt-2">
              Dr. {doctor.name}
            </h1>
            <div className="mt-8 space-y-4 text-gray-700">
              <div>
                <span className="font-semibold">Qualification:</span>
                <p>{doctor.qualification}</p>
              </div>
              <div>
                <span className="font-semibold">Experience:</span>
                <p>{doctor.experience} Years</p>
              </div>
              <div>
                <span className="font-semibold">Consultation Fee:</span>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{doctor.consultationFee}
                </p>
              </div>
              <div>
                <span className="font-semibold">Available Time:</span>
                <p>{doctor.availableTime || "Contact hospital"}</p>
              </div>
              <div>
                <span className="font-semibold">Available Days:</span>
                <p>
                  {doctor.availableDays?.length > 0
                    ? doctor.availableDays.join(", ")
                    : "Contact hospital"}
                </p>
              </div>
            </div>
            <Link
              to={`/book/${doctor._id}`}
              className="block text-center mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DoctorDetails;