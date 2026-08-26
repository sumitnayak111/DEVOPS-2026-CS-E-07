import { useEffect, useState } from "react";
import API from "../services/api";

function AdminMedicalRecords() {
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);

  const [selectedAppointment, setSelectedAppointment] = useState("");

  const [formData, setFormData] = useState({
    diagnosis: "",
    symptoms: "",
    prescription: "",
    medicines: "",
    doctorNotes: "",
    followUpDate: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchRecords();
  }, []);

  // ==========================================
  // GET ALL APPOINTMENTS
  // ==========================================

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");

      const completedAppointments = (res.data.data || []).filter(
        (appointment) => appointment.status === "Completed"
      );

      setAppointments(completedAppointments);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // GET ALL MEDICAL RECORDS
  // ==========================================

  const fetchRecords = async () => {
    try {
      const res = await API.get("/medical-records");

      setRecords(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // CREATE MEDICAL RECORD
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAppointment) {
      alert("Please select a completed appointment");
      return;
    }

    if (!formData.diagnosis.trim()) {
      alert("Please enter diagnosis");
      return;
    }

    try {
      setLoading(true);

      await API.post("/medical-records", {
        appointment: selectedAppointment,
        ...formData,
      });

      alert("Medical Record Created Successfully");

      setSelectedAppointment("");

      setFormData({
        diagnosis: "",
        symptoms: "",
        prescription: "",
        medicines: "",
        doctorNotes: "",
        followUpDate: "",
      });

      fetchRecords();
      fetchAppointments();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to create medical record"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE RECORD
  // ==========================================

  const deleteRecord = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medical record?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/medical-records/${id}`);

      alert("Medical Record Deleted Successfully");

      fetchRecords();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete medical record"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Medical Records Management
        </h1>

        {/* ==========================================
            CREATE RECORD
        ========================================== */}

        <div className="bg-white p-6 rounded-xl shadow mb-10">

          <h2 className="text-2xl font-semibold mb-6">
            Create Medical Record
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Appointment */}

            <div className="mb-4">

              <label className="block font-medium mb-2">
                Completed Appointment
              </label>

              <select
                value={selectedAppointment}
                onChange={(e) =>
                  setSelectedAppointment(e.target.value)
                }
                className="border rounded-lg p-3 w-full"
              >

                <option value="">
                  Select Completed Appointment
                </option>

                {appointments.map((appointment) => (
                  <option
                    key={appointment._id}
                    value={appointment._id}
                  >
                    {appointment.patient?.name} -{" "}
                    {appointment.doctor?.name} -{" "}
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}
                  </option>
                ))}

              </select>

            </div>

            {/* Diagnosis */}

            <div className="mb-4">

              <label className="block font-medium mb-2">
                Diagnosis *
              </label>

              <input
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                placeholder="Enter diagnosis"
                className="border rounded-lg p-3 w-full"
              />

            </div>

            {/* Symptoms */}

            <div className="mb-4">

              <label className="block font-medium mb-2">
                Symptoms
              </label>

              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Enter symptoms"
                rows="3"
                className="border rounded-lg p-3 w-full"
              />

            </div>

            {/* Prescription */}

            <div className="mb-4">

              <label className="block font-medium mb-2">
                Prescription
              </label>

              <textarea
                name="prescription"
                value={formData.prescription}
                onChange={handleChange}
                placeholder="Enter prescription instructions"
                rows="3"
                className="border rounded-lg p-3 w-full"
              />

            </div>

            {/* Medicines */}

            <div className="mb-4">

              <label className="block font-medium mb-2">
                Medicines
              </label>

              <textarea
                name="medicines"
                value={formData.medicines}
                onChange={handleChange}
                placeholder="Example: Paracetamol 500mg - twice daily"
                rows="3"
                className="border rounded-lg p-3 w-full"
              />

            </div>

            {/* Doctor Notes */}

            <div className="mb-4">

              <label className="block font-medium mb-2">
                Doctor Notes
              </label>

              <textarea
                name="doctorNotes"
                value={formData.doctorNotes}
                onChange={handleChange}
                placeholder="Enter consultation notes"
                rows="3"
                className="border rounded-lg p-3 w-full"
              />

            </div>

            {/* Follow Up */}

            <div className="mb-6">

              <label className="block font-medium mb-2">
                Follow-up Date
              </label>

              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              {loading
                ? "Creating..."
                : "Create Medical Record"}
            </button>

          </form>
        </div>

        {/* ==========================================
            EXISTING RECORDS
        ========================================== */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-semibold mb-6">
            Existing Medical Records
          </h2>

          {records.length === 0 ? (
            <p className="text-gray-500">
              No medical records found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full border">

                <thead>

                  <tr className="bg-blue-600 text-white">

                    <th className="border p-3">
                      Patient
                    </th>

                    <th className="border p-3">
                      Doctor
                    </th>

                    <th className="border p-3">
                      Diagnosis
                    </th>

                    <th className="border p-3">
                      Medicines
                    </th>

                    <th className="border p-3">
                      Follow-up
                    </th>

                    <th className="border p-3">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {records.map((record) => (

                    <tr key={record._id}>

                      <td className="border p-3">
                        {record.patient?.name}
                      </td>

                      <td className="border p-3">
                        {record.doctor?.name}
                      </td>

                      <td className="border p-3">
                        {record.diagnosis}
                      </td>

                      <td className="border p-3">
                        {record.medicines || "-"}
                      </td>

                      <td className="border p-3">
                        {record.followUpDate
                          ? new Date(
                              record.followUpDate
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="border p-3">

                        <button
                          onClick={() =>
                            deleteRecord(record._id)
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminMedicalRecords;