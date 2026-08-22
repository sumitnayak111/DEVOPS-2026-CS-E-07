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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");

      return;
    }

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);

      data.append("specialization", formData.specialization);

      data.append("qualification", formData.qualification);

      data.append("experience", formData.experience);

      data.append("phone", formData.phone);

      data.append("email", formData.email);

      data.append("consultationFee", formData.consultationFee);

      data.append("availableTime", formData.availableTime);

      if (image) {
        data.append("image", image);
      }

      const res = await API.post("/doctors", data);

      alert(res.data?.message || "Doctor Added Successfully!");

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
      console.log("Doctor Add Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to add doctor. Please check the server.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Doctor</h2>

      {/* Image */}

      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-2">
          Doctor Profile Image
        </label>

        <div className="flex items-center gap-5">
          {preview ? (
            <img
              src={preview}
              alt="Doctor Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600"
            />

            <p className="text-xs text-gray-500 mt-2">
              JPG, PNG or WEBP. Maximum 5 MB.
            </p>
          </div>
        </div>
      </div>

      {/* Form fields */}

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full"
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full"
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full"
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience (Years)"
          value={formData.experience}
          onChange={handleChange}
          min="0"
          required
          className="border border-gray-300 rounded-lg p-3 w-full"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full"
        />

        <input
          type="number"
          name="consultationFee"
          placeholder="Consultation Fee (₹)"
          value={formData.consultationFee}
          onChange={handleChange}
          min="0"
          required
          className="border border-gray-300 rounded-lg p-3 w-full"
        />

        <input
          type="text"
          name="availableTime"
          placeholder="Available Time (9 AM - 5 PM)"
          value={formData.availableTime}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
      >
        {loading ? "Adding Doctor..." : "Add Doctor"}
      </button>
    </form>
  );
}
export default DoctorForm;