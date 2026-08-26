import AdminMedicalRecords from "./pages/AdminMedicalRecords";
import MyMedicalRecords from "./pages/MyMedicalRecords";
import AdminAppointments from "./pages/AdminAppointments";

import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Doctors from "./pages/Doctors";

import BookAppointment from "./pages/BookAppointment";

import MyAppointments from "./pages/MyAppointments";

import AdminDashboard from "./pages/AdminDashboard";

import PatientDashboard from "./pages/PatientDashboard";

import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/doctors" element={<Doctors />} />

        <Route path="/book/:id" element={<BookAppointment />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <AdminAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/medical-records"
         element={
           <ProtectedRoute role="admin">
              <AdminMedicalRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <MyAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medical-records"
          element={
            <ProtectedRoute role="patient">
               <MyMedicalRecords />
            </ProtectedRoute>
           }
        />

        <Route
         path="/patient"
         element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
             </ProtectedRoute>
             }
          />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
