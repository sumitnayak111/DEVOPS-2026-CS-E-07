import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  const image = doctor?.image
  ? `http://localhost:8000${doctor.image}`
  : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500";
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      {/* Doctor Image */}

      <div className="relative">
        <img
          src={image}
          alt={doctor?.name || "Doctor"}
          className="w-full h-64 object-cover"
        />

        <div className="absolute top-4 right-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
          ● Available
        </div>
      </div>

      {/* Details */}

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Dr. {doctor?.name || "Doctor"}
        </h2>

        <p className="text-blue-600 font-semibold mt-2">
          {doctor?.specialization || "Specialist"}
        </p>

        {doctor?.qualification && (
          <p className="text-gray-500 mt-2">🎓 {doctor.qualification}</p>
        )}

        <p className="text-gray-600 mt-2">
          💼 {doctor?.experience || 0} Years Experience
        </p>

        <p className="text-gray-600 mt-2">
          💰 Consultation: ₹{doctor?.consultationFee || 0}
        </p>

        {doctor?.availableTime && (
          <p className="text-gray-600 mt-2">🕐 {doctor.availableTime}</p>
        )}

        <div className="mt-4">
          <span className="text-yellow-500 text-lg">★★★★★</span>

          <span className="text-gray-500 ml-2">4.9</span>
        </div>

        <Link
          to={`/book/${doctor?._id}`}
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-5 transition"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;