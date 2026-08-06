import { Link } from "react-router-dom";
function DoctorCard({ doctor }) {
  return (
    <tr>
      <td className="border p-2">{doctor.name}</td>
      <td className="border p-2">{doctor.specialization}</td>
      <td className="border p-2">{doctor.experience} Years</td>
      <td className="border p-2">₹{doctor.consultationFee}</td>
      <td className="border p-2">
        <Link
          to={`/book/${doctor._id}`}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Book Appointment
        </Link>
      </td>
    </tr>
  );
}
export default DoctorCard;