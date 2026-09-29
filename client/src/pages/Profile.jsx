import { useEffect, useState } from "react";
import API from "../services/api";
import { FaUserCircle, FaEdit, FaLock, FaSave, FaTimes } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Profile form state
  const [form, setForm] = useState({ name: "", phone: "" });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/auth/profile");
      setUser(res.data.data);
      setForm({
        name: res.data.data.name || "",
        phone: res.data.data.phone || "",
      });
    } catch (err) {
      setErrorMsg("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setErrorMsg("");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const showError = (msg) => {
    setErrorMsg(msg);
    setSuccessMsg("");
    setTimeout(() => setErrorMsg(""), 3000);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      showError("Name cannot be empty.");
      return;
    }
    try {
      setSaving(true);
      const res = await API.put("/auth/profile", form);
      setUser(res.data.data);
      setEditing(false);
      showSuccess("Profile updated successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showError("New passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showError("New password must be at least 6 characters.");
      return;
    }
    try {
      setSaving(true);
      await API.put("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showSuccess("Password changed successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to change password.");
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":   return "bg-red-100 text-red-700";
      case "doctor":  return "bg-green-100 text-green-700";
      default:        return "bg-blue-100 text-blue-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-xl text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center mb-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <FaUserCircle size={80} className="text-white opacity-90" />
          </div>
          <h1 className="text-3xl font-bold">{user?.name}</h1>
          <p className="text-blue-100 mt-1">{user?.email}</p>
          <span className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold capitalize ${getRoleBadge(user?.role)}`}>
            {user?.role}
          </span>
        </div>

        {/* Success / Error Messages */}
        {successMsg && (
          <div className="bg-green-100 text-green-700 rounded-xl p-4 mb-4 text-center font-semibold">
            ✅ {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 rounded-xl p-4 mb-4 text-center font-semibold">
            ❌ {errorMsg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
              activeTab === "profile"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaEdit /> My Profile
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
              activeTab === "password"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaLock /> Change Password
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Profile Information
              </h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <FaEdit /> Edit
                </button>
              )}
            </div>

            {!editing ? (
              // View Mode
              <div className="space-y-5">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-500 font-medium">Full Name</span>
                  <span className="font-semibold text-gray-800">{user?.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-500 font-medium">Email</span>
                  <span className="font-semibold text-gray-800">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-500 font-medium">Phone</span>
                  <span className="font-semibold text-gray-800">
                    {user?.phone || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-500 font-medium">Role</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getRoleBadge(user?.role)}`}>
                    {user?.role}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500 font-medium">Member Since</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric", month: "long", day: "numeric"
                    })}
                  </span>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                  >
                    <FaSave /> {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setForm({ name: user?.name || "", phone: user?.phone || "" });
                    }}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Change Password
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Min 6 characters"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Repeat new password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
              >
                {saving ? "Changing Password..." : "Change Password"}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;