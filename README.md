# 🏥 Hospital Management System

A full-stack web application for managing hospital operations digitally. It lets patients browse doctors and book appointments online, and gives administrators a dashboard to manage doctors and appointment requests.

## 🌐 Live Deployment

| Service | Platform | Live URL | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Web App** | **Vercel** | [hospital-management-system-delta-jet.vercel.app](https://hospital-management-system-delta-jet.vercel.app) | 🟢 Live |
| **Backend REST API** | **Render** | [hospital-backend-api-480e.onrender.com](https://hospital-backend-api-480e.onrender.com) | 🟢 Live |
| **Prometheus Metrics** | **Render** | [hospital-backend-api-480e.onrender.com/metrics](https://hospital-backend-api-480e.onrender.com/metrics) | 🟢 Live |
| **Database** | **MongoDB Atlas** | Cloud Managed Cluster | 🟢 Connected |

## 📌 Project Overview

The Hospital Management System provides a centralized platform that reduces manual paperwork and makes doctor and appointment data easy to store, search, and manage. Patients and admins get separate, role-based experiences.

## ✨ Features

### 👤 Authentication & Roles
* Register, login, and profile management
* JWT-based authentication
* Role-based access control (**Admin** and **Patient**) with protected routes

### 👨‍⚕️ Doctor Management
* Admin can add, view, update, and delete doctors
* Doctor profile image upload
* Doctor details: specialization, qualification, experience, consultation fee, available days and time
* **Doctor Search & Filter**: search plus max-fee and minimum-experience filters, an advanced-filter toggle, active filter tags, clear-all, and a live result count

### 📅 Appointment Management
* Patients can book appointments with doctors
* Patients can view their own appointments
* Admin can view all appointments and update status: `Pending`, `Approved`, `Rejected`, `Completed`
* Admin can delete appointments

### 📊 Dashboards
* **Admin Dashboard** for managing doctors and appointments
* **Patient Dashboard** for personal appointments and information
* **DevOps Observability Hub** directly integrated into the client application

### 📞 Contact Us
* Contact form with validation
* Information cards, embedded Google Map, emergency banner, and quick links

## 🛠️ Tech Stack

| Layer     | Technology                         |
| --------- | ---------------------------------- |
| Frontend  | React, Vite, TailwindCSS           |
| Backend   | Node.js, Express.js                |
| Database  | MongoDB, Mongoose                  |
| File Upload | Multer                           |
| CI/CD     | Jenkins, GitHub Actions            |
| Monitoring | Prometheus, Grafana               |
| Deployment | Vercel (Frontend), Render (Backend), MongoDB Atlas |
| Version Control | Git & GitHub                 |

## 🏗️ Project Structure

```text
DEVOPS-2026-CS-E-07/
│
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── pages/           # Home, Login, Register, Doctors, DoctorDetails,
│   │   │                    # BookAppointment, MyAppointments, AdminDashboard,
│   │   │                    # AdminAppointments, PatientDashboard, Monitoring, NotFound
│   │   └── components/      # Navbar, Footer, ProtectedRoute, DoctorCard, DoctorForm
│   └── vercel.json          # SPA routing configuration for Vercel
│
├── server/                  # Node.js + Express backend
│   ├── config/              # db.js connection
│   ├── controllers/         # appointment, auth, doctor controllers
│   ├── models/              # Doctor, Appointment, User
│   ├── routes/              # auth, doctors, appointments
│   ├── middleware/          # authMiddleware, uploadMiddleware, metricsMiddleware
│   └── uploads/doctors/     # Uploaded doctor images
│
├── prometheus/              # Prometheus scraping configuration
│   └── prometheus.yml
│
├── grafana/                 # Grafana automated provisioning & dashboards
│   └── provisioning/
│       ├── datasources/     # Auto-configured Prometheus datasource
│       └── dashboards/      # Pre-built Hospital System metrics dashboard
│
├── docker-compose.yml       # Multi-container orchestration (Server, Client, Mongo, Prometheus, Grafana)
├── render.yaml              # Render cloud infrastructure blueprint
└── README.md
```

## 🗄️ Database Models

**Doctor**: `name`, `specialization`, `qualification`, `experience`, `phone`, `email`, `consultationFee`, `availableDays`, `availableTime`, `image`

**Appointment**: `patient` (ref → User), `doctor` (ref → Doctor), `appointmentDate`, `appointmentTime`, `status` (`Pending` / `Approved` / `Rejected` / `Completed`), `reason`

## 🔌 API Endpoints

| Base Route          | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `/api/auth`         | Register, login, profile                                                    |
| `/api/doctors`      | Full CRUD for doctors (create, update, delete are admin-protected)          |
| `/api/appointments` | Book, get my appointments, get by ID; admin: get all, update status, delete |
| `/metrics`          | Prometheus application and system scrape endpoint                           |

## 📈 Monitoring & Observability (Prometheus & Grafana)

The project includes an observability stack with **Prometheus** and **Grafana** configured in Docker Compose.

### Monitored Metrics:
* **HTTP Requests**: rate, count, and error breakdown by status code and route (`hms_http_requests_total`)
* **Response Latency**: 95th & 50th percentile durations (`hms_http_request_duration_seconds`)
* **Active Connections**: in-flight HTTP requests (`hms_http_requests_in_flight`)
* **Node.js System Metrics**: Heap memory, resident memory (RSS), CPU utilization, event loop lag, and active handles

### Access & Service Ports (Local Docker Stack):
* **Frontend**: `http://localhost:3000`
* **Backend API**: `http://localhost:8000`
* **Backend Metrics Endpoint**: `http://localhost:8000/metrics`
* **Prometheus UI**: `http://localhost:9090`
* **Grafana Dashboard**: `http://localhost:3001` (Credentials: `admin` / `admin`)
  * Automatically provisions Prometheus data source and pre-loads the **"Hospital Management System - Monitoring Dashboard"**.

To run the full stack locally including monitoring:
```bash
docker compose up --build
```

## ⚙️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sumitnayak111/DEVOPS-2026-CS-E-07.git
cd DEVOPS-2026-CS-E-07
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Set Up the Frontend

```bash
cd ../client
npm install
npm run dev
```

The frontend runs on Vite at `http://localhost:5173`.

## 👥 User Roles

### Admin
* Manage doctors (add, edit, delete, upload images)
* View all appointments and approve, reject, or complete them
* Delete appointments
* Access system observability links and dashboard

### Patient
* Register and log in
* Search and filter doctors, view doctor details
* Book appointments and track their status

## 🔄 Basic Workflow

```text
User
  │
  ▼
Login / Registration
  │
  ├── Patient ──► Browse Doctors ──► Book Appointment ──► My Appointments
  │
  └── Admin ────► Manage Doctors ──► Review Appointments (Approve / Reject / Complete)
```

## 🔁 CI/CD

The project uses **Jenkins** and **GitHub Actions** for continuous integration and delivery.

## 🤝 Contributing

1. Clone the repository
2. Work on your assigned branch
3. Commit your changes with a clear message
4. Push to your branch and open a Pull Request into `main`

```bash
git add .
git commit -m "Describe your change"
git push origin <your-branch>
```

## 👨‍💻 Contributors

* **Sumit Nayak**: repository owner, built the base application
* **Sunil**: feature development (Doctor Search & Filter, Contact Us, Prometheus & Grafana Monitoring, Cloud Deployment on Render & Vercel), B.Tech Computer Science and Engineering, SKIT Jaipur

## 📄 License

This project is developed for **educational purposes**.
