import { useEffect, useState } from "react";
import API from "../services/api";
import DoctorCard from "../components/DoctorCard";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [maxFee, setMaxFee] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/doctors");
      setDoctors(res.data?.data || []);
    } catch (err) {
      console.log("Doctors Error:", err);
      setError("Unable to load doctors.");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  // Build specialization list dynamically from fetched doctors
  const specializations = [
    "All",
    ...new Set(
      doctors.map((d) => d?.specialization).filter(Boolean)
    ),
  ];

  // Apply all filters
  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor?.name?.toLowerCase() || "";
    const spec = doctor?.specialization?.toLowerCase() || "";
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      name.includes(searchValue) || spec.includes(searchValue);

    const matchesSpecialization =
      specialization === "All" ||
      doctor?.specialization === specialization;

    const matchesFee =
      maxFee === "" ||
      (doctor?.consultationFee ?? 0) <= Number(maxFee);

    const matchesExperience =
      minExperience === "" ||
      (doctor?.experience ?? 0) >= Number(minExperience);

    return (
      matchesSearch &&
      matchesSpecialization &&
      matchesFee &&
      matchesExperience
    );
  });

  // Check if any filter is active
  const isFiltered =
    search !== "" ||
    specialization !== "All" ||
    maxFee !== "" ||
    minExperience !== "";

  const clearFilters = () => {
    setSearch("");
    setSpecialization("All");
    setMaxFee("");
    setMinExperience("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Find Your Doctor
          </h1>
          <p className="text-gray-500 mt-3">
            Search and filter from our experienced doctors and book your
            appointment.
          </p>
        </div>

        {/* Search & Filter Panel */}
        <div className="bg-white p-6 rounded-xl shadow">

          {/* Search bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-3.5 text-gray-400 text-lg">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by doctor name or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Toggle advanced filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-lg border font-semibold transition ${
                showFilters
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
              }`}
            >
              {showFilters ? "Hide Filters ▲" : "More Filters ▼"}
            </button>

            {/* Clear filters button — only shown when filters are active */}
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="px-5 py-3 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition"
              >
                Clear ✕
              </button>
            )}
          </div>

          {/* Advanced filters — shown/hidden */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">

              {/* Specialization filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Specialization
                </label>
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {specializations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max consultation fee filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Max Consultation Fee (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={maxFee}
                  onChange={(e) => setMaxFee(e.target.value)}
                  min={0}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Min experience filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Minimum Experience (Years)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={minExperience}
                  onChange={(e) => setMinExperience(e.target.value)}
                  min={0}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          )}

          {/* Active filter tags */}
          {isFiltered && (
            <div className="flex flex-wrap gap-2 mt-4">
              {search && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Search: "{search}"
                  <button onClick={() => setSearch("")} className="font-bold hover:text-red-500">✕</button>
                </span>
              )}
              {specialization !== "All" && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {specialization}
                  <button onClick={() => setSpecialization("All")} className="font-bold hover:text-red-500">✕</button>
                </span>
              )}
              {maxFee && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Fee ≤ ₹{maxFee}
                  <button onClick={() => setMaxFee("")} className="font-bold hover:text-red-500">✕</button>
                </span>
              )}
              {minExperience && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Exp ≥ {minExperience} yrs
                  <button onClick={() => setMinExperience("")} className="font-bold hover:text-red-500">✕</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center mt-10">
            <p className="text-xl text-gray-600">Loading doctors...</p>
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

        {/* Doctors Grid */}
        {!loading && !error && (
          <>
            <div className="flex justify-between items-center mt-8 mb-5">
              <h2 className="text-xl font-semibold text-gray-700">
                {isFiltered ? "Filtered Results" : "Available Doctors"}
              </h2>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                {filteredDoctors.length}{" "}
                {filteredDoctors.length === 1 ? "Doctor" : "Doctors"}
              </span>
            </div>

            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <p className="text-5xl mb-4">🔍</p>
                <h2 className="text-2xl font-semibold text-gray-800">
                  No Doctors Found
                </h2>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor) => (
                  <div key={doctor._id} className="relative">
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