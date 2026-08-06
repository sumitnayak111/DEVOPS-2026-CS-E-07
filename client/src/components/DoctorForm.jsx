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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/doctors", formData);
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
      if (onDoctorAdded) {
       onDoctorAdded();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        name="name"
        placeholder="Doctor Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="specialization"
        placeholder="Specialization"
        value={formData.specialization}
        onChange={handleChange}
      />
      <input
        type="text"
        name="qualification"
        placeholder="Qualification"
        value={formData.qualification}
        onChange={handleChange}
      />
      <input
        type="number"
        name="experience"
        placeholder="Experience"
        value={formData.experience}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="number"
        name="consultationFee"
        placeholder="Consultation Fee"
        value={formData.consultationFee}
        onChange={handleChange}
      />
      <input
        type="text"
        name="availableTime"
        placeholder="Available Time (9 AM - 5 PM)"
        value={formData.availableTime}
        onChange={handleChange}
      />
      <button type="submit">
        Add Doctor
      </button>
    </form>
  );
}
export default DoctorForm;