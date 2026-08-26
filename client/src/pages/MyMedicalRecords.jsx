import { useEffect, useState } from "react";
import API from "../services/api";

function MyMedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await API.get("/medical-records/my");

      setRecords(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl">
          Loading medical records...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          My Medical Records
        </h1>

        {records.length === 0 ? (

          <div className="bg-white p-10 rounded-xl shadow text-center">

            <h2 className="text-2xl font-semibold">
              No Medical Records
            </h2>

            <p className="text-gray-500 mt-2">
              Your medical records will appear here
              after your completed appointments.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {records.map((record) => (

              <div
                key={record._id}
                className="bg-white rounded-xl shadow p-6"
              >

                {/* Header */}

                <div className="flex justify-between items-center mb-6">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {record.doctor?.name}
                    </h2>

                    <p className="text-gray-500">
                      {record.doctor?.specialization}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">
                      Appointment
                    </p>

                    <p className="text-gray-500">

                      {record.appointment?.appointmentDate
                        ? new Date(
                            record.appointment
                              .appointmentDate
                          ).toLocaleDateString()
                        : "-"}

                    </p>

                  </div>

                </div>

                {/* Diagnosis */}

                <div className="border-t pt-4 mb-4">

                  <h3 className="font-semibold text-lg">
                    Diagnosis
                  </h3>

                  <p className="text-gray-700 mt-1">
                    {record.diagnosis}
                  </p>

                </div>

                {/* Symptoms */}

                <div className="mb-4">

                  <h3 className="font-semibold text-lg">
                    Symptoms
                  </h3>

                  <p className="text-gray-700 mt-1">
                    {record.symptoms || "Not provided"}
                  </p>

                </div>

                {/* Prescription */}

                <div className="mb-4">

                  <h3 className="font-semibold text-lg">
                    Prescription
                  </h3>

                  <p className="text-gray-700 mt-1 whitespace-pre-line">
                    {record.prescription ||
                      "Not provided"}
                  </p>

                </div>

                {/* Medicines */}

                <div className="mb-4">

                  <h3 className="font-semibold text-lg">
                    Medicines
                  </h3>

                  <p className="text-gray-700 mt-1 whitespace-pre-line">
                    {record.medicines ||
                      "Not provided"}
                  </p>

                </div>

                {/* Doctor Notes */}

                <div className="mb-4">

                  <h3 className="font-semibold text-lg">
                    Doctor Notes
                  </h3>

                  <p className="text-gray-700 mt-1 whitespace-pre-line">
                    {record.doctorNotes ||
                      "Not provided"}
                  </p>

                </div>

                {/* Follow Up */}

                <div className="border-t pt-4">

                  <h3 className="font-semibold">
                    Follow-up Date
                  </h3>

                  <p className="text-blue-600 font-medium mt-1">

                    {record.followUpDate
                      ? new Date(
                          record.followUpDate
                        ).toLocaleDateString()
                      : "No follow-up scheduled"}

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyMedicalRecords;