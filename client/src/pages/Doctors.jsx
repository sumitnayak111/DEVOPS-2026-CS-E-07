import { useEffect, useState } from "react";
import API from "../services/api";
import DoctorCard from "../components/DoctorCard";
function Doctors() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetchDoctors();
  }, []);
  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Our Doctors</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border p-2">Name</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Experience</th>
            <th className="border p-2">Fees</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Doctors;
