const express = require("express");
const path = require("path");
const cors = require("cors");
const appointmentRoutes = require("./routes/appointmentRoutes");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const {
  requestMonitoringMiddleware,
  metricsHandler,
} = require("./middleware/metricsMiddleware");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(requestMonitoringMiddleware);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
// Metrics endpoint
app.get("/metrics", metricsHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hospital Management API Running ",
  });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
