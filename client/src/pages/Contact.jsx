import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    else if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  const infoCards = [
    {
      icon: <FaPhone className="text-blue-600 text-2xl" />,
      title: "Phone",
      lines: ["+91 98765 43210", "+91 01412 345678"],
    },
    {
      icon: <FaEnvelope className="text-blue-600 text-2xl" />,
      title: "Email",
      lines: ["support@hospitalms.com", "admin@hospitalms.com"],
    },
    {
      icon: <FaMapMarkerAlt className="text-blue-600 text-2xl" />,
      title: "Address",
      lines: ["SKIT Campus, Ramnagaria", "Jagatpura, Jaipur - 302017"],
    },
    {
      icon: <FaClock className="text-blue-600 text-2xl" />,
      title: "Working Hours",
      lines: ["Mon - Sat: 8:00 AM – 8:00 PM", "Emergency: 24/7"],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Banner */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Have a question, feedback, or need help? We're here for you.
            Reach out and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {card.title}
              </h3>
              {card.lines.map((line, i) => (
                <p key={i} className="text-gray-500 text-sm">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Fill the form below and we'll respond within 24 hours.
            </p>

            {submitted && (
              <div className="bg-green-100 text-green-700 rounded-lg p-4 mb-6 text-center font-semibold">
                ✅ Your message has been sent! We'll get back to you soon.
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.email ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.subject ? "border-red-400" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="Appointment Query">Appointment Query</option>
                  <option value="Doctor Information">Doctor Information</option>
                  <option value="Billing Issue">Billing Issue</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="General Feedback">General Feedback</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${
                    errors.message ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {form.message.length} characters
                </p>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">

            {/* Google Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                title="Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.8!2d75.8577!3d26.8505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9b1e0c4d6db%3A0x87d49e7a0a6caef8!2sSKIT%20Jaipur!5e0!3m2!1sen!2sin!4v1680000000000"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

            {/* Emergency Banner */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
              <h3 className="text-red-600 font-bold text-lg mb-1">
                🚨 Emergency?
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                For medical emergencies, don't wait. Call us immediately or
                visit our emergency ward — open 24 hours, 7 days a week.
              </p>
              <a
                href="tel:+919876543210"
                className="inline-block bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                📞 Call Emergency Now
              </a>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-gray-800 font-bold text-lg mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <Link to="/doctors" className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
                  → Find a Doctor
                </Link>
                <Link to="/appointments" className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
                  → My Appointments
                </Link>
                <Link to="/register" className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
                  → Register as Patient
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        © 2026 Hospital Management System | All Rights Reserved
      </footer>
    </div>
  );
}

export default Contact;