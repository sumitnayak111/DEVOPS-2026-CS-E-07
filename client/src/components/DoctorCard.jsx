import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  const imageUrl = doctor?.image
    ? `http://localhost:8000${doctor.image}`
    : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={imageUrl}
        alt={doctor?.name || "Doctor"}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.currentTarget.src =
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500";
        }}
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800">
          Dr. {doctor?.name || "Doctor"}
        </h2>

        <p className="text-blue-600 font-semibold mt-2">
          {doctor?.specialization || "Specialist"}
        </p>

        <p className="text-gray-600 mt-2">
          Experience: {doctor?.experience || 0} Years
        </p>

        <p className="text-gray-600 mt-1">
          Consultation Fee: ₹{doctor?.consultationFee || 0}
        </p>

        <div className="mt-3">
          ⭐⭐⭐⭐⭐
          <span className="text-gray-500 ml-2">4.9</span>
        </div>

        <Link
          to={`/book/${doctor?._id}`}
          className="block text-center bg-blue-600 text-white py-3 rounded-lg mt-5 hover:bg-blue-700"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;
