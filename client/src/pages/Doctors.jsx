import { useEffect, useState } from "react";
import API from "../services/api";
import DoctorCard from "../components/DoctorCard";
function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchDoctors();
  }, []);
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/doctors");
      console.log("Doctors API:", res.data);
      setDoctors(res.data?.data || []);
    } catch (err) {
      console.log("Doctors Error:", err);
      setError("Unable to load doctors.");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };
  const specializations = [
    "All",
    ...new Set(
      doctors
        .map((doctor) => doctor?.specialization)
        .filter(Boolean)
    ),
  ];
  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor?.name?.toLowerCase() || "";
    const spec = doctor?.specialization?.toLowerCase() || "";
    const searchValue = search.toLowerCase();
    const matchesSearch =
      name.includes(searchValue) ||
      spec.includes(searchValue);
    const matchesSpecialization =
      specialization === "All" ||
      doctor?.specialization === specialization;
    return matchesSearch && matchesSpecialization;
  });
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Find Your Doctor
        </h1>
        <p className="text-center text-gray-500 mt-3">
          Choose from our experienced doctors and book your appointment.
        </p>
        {/* Search */}
        <div className="bg-white p-5 rounded-xl shadow mt-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full"
            />
            <select
              value={specialization}
              onChange={(e) =>
                setSpecialization(e.target.value)
              }
              className="border border-gray-300 rounded-lg p-3 w-full"
            >
              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Loading */}
        {loading && (
          <div className="text-center mt-10">
            <p className="text-xl text-gray-600">
              Loading doctors...
            </p>
          </div>
        )}
        {/* Error */}
        {!loading && error && (
          <div className="bg-red-100 text-red-700 p-5 rounded-lg mt-8 text-center">
            {error}
            <button
              onClick={fetchDoctors}
              className="block mx-auto mt-4 bg-red-600 text-white px-5 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        )}
        {/* Doctors */}
        {!loading && !error && (
          <>
            <div className="flex justify-between items-center mt-8 mb-5">
              <h2 className="text-xl font-semibold">
                Available Doctors
              </h2>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                {filteredDoctors.length} Doctors
              </span>
            </div>
            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-10 text-center">
                <h2 className="text-2xl font-semibold">
                  No Doctors Found
                </h2>
                <p className="text-gray-500 mt-2">
                  No doctors are currently available.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="relative"
                  >
                    <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                      ● Available
                    </div>
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default Doctors;