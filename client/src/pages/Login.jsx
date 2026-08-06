import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
function Login() {
const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting...", { email, password });
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);

    console.log(res.data);
    alert("Login Successful");
    if (res.data.user.role === "admin") {
  navigate("/admin");
  
} else {
  navigate("/patient");
}
  } catch (err) {
    console.log(err);
    console.log(err.response);
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Login Failed");
  }
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;