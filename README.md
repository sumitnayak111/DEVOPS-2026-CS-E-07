# 🏥 Hospital Management System

A full-stack web application for managing hospital operations digitally. It lets patients browse doctors and book appointments online, and gives administrators a dashboard to manage doctors and appointment requests.

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
| Version Control | Git & GitHub                 |

## 🏗️ Project Structure

```text
DEVOPS-2026-CS-E-07/
│
├── client/                  # React + Vite frontend
│   └── src/
│       ├── pages/           # Home, Login, Register, Doctors, DoctorDetails,
│       │                    # BookAppointment, MyAppointments, AdminDashboard,
│       │                    # AdminAppointments, PatientDashboard, NotFound
│       └── components/      # Navbar, Footer, ProtectedRoute
│
├── server/                  # Node.js + Express backend
│   ├── models/              # Doctor, Appointment, User
│   ├── routes/              # auth, doctors, appointments
│   ├── middleware/          # authMiddleware, uploadMiddleware
│   └── uploads/doctors/     # Uploaded doctor images
│
└── README.md
```

> Folder names inside `client/` and `server/` may differ slightly; adjust to match the repository.

## 🗄️ Database Models

**Doctor**: `name`, `specialization`, `qualification`, `experience`, `phone`, `email`, `consultationFee`, `availableDays`, `availableTime`, `image`

**Appointment**: `patient` (ref → User), `doctor` (ref → Doctor), `appointmentDate`, `appointmentTime`, `status` (`Pending` / `Approved` / `Rejected` / `Completed`), `reason`

## 🔌 API Endpoints

| Base Route          | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `/api/auth`         | Register, login, profile                                                    |
| `/api/doctors`      | Full CRUD for doctors (create, update, delete are admin-protected)          |
| `/api/appointments` | Book, get my appointments, get by ID; admin: get all, update status, delete |

## ⚙️ Installation and Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or later recommended)
* [MongoDB](https://www.mongodb.com/) (local instance or Atlas)
* Git

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
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

### 3. Set Up the Frontend

```bash
cd client
npm install
npm run dev
```

The frontend runs on Vite's default address, `http://localhost:5173`.

## 👥 User Roles

### Admin
* Manage doctors (add, edit, delete, upload images)
* View all appointments and approve, reject, or complete them
* Delete appointments

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

## 🚀 Future Enhancements

* Medical records and prescription management
* Online payment system
* Email/SMS appointment notifications
* Pharmacy, laboratory, and blood bank modules
* Reports and analytics
* Cloud deployment

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
* **Sunil**: feature development (Doctor Search & Filter, Contact Us, and more), B.Tech Computer Science and Engineering, SKIT Jaipur

## 📄 License

This project is developed for **educational purposes**.