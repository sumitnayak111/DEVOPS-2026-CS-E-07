import { useState } from "react";

import API from "../services/api";

function DoctorForm({ onDoctorAdded }) {
  const [formData, setFormData] = useState({
    name: "",

    specialization: "",

    qualification: "",

    experience: "",

    phone: "",

    email: "",

    consultationFee: "",

    availableTime: "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (image) {
        data.append("image", image);
      }

      await API.post("/doctors", data);

      alert("Doctor Added Successfully!");

      setFormData({
        name: "",

        specialization: "",

        qualification: "",

        experience: "",

        phone: "",

        email: "",

        consultationFee: "",

        availableTime: "",
      });

      setImage(null);

      setPreview("");

      if (onDoctorAdded) {
        onDoctorAdded();
      }
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to add doctor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience (Years)"
          value={formData.experience}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="number"
          name="consultationFee"
          placeholder="Consultation Fee"
          value={formData.consultationFee}
          onChange={handleChange}
          required
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="text"
          name="availableTime"
          placeholder="Available Time"
          value={formData.availableTime}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
        />
      </div>

      {/* Doctor Image */}

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
        <label className="block text-lg font-semibold mb-3">
          Doctor Profile Image
        </label>

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleImageChange}
          className="w-full"
        />

        {preview && (
          <div className="mt-5">
            <p className="text-gray-600 mb-2">Image Preview</p>

            <img
              src={preview}
              alt="Doctor Preview"
              className="w-40 h-40 object-cover rounded-xl shadow"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
      >
        Add Doctor
      </button>
    </form>
  );
}

export default DoctorForm;
