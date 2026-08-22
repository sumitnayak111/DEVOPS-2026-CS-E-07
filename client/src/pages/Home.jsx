import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Hospital Management System
            </h1>
            <p className="text-lg mb-8">
              Book appointments with experienced doctors anytime,
              anywhere. Fast, secure and easy.
            </p>
            <Link
              to="/doctors"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Book Appointment
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700"
              alt="Hospital"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Achievements
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-600">100+</h3>
            <p className="mt-3">Doctors</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-600">5000+</h3>
            <p className="mt-3">Patients</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-600">24/7</h3>
            <p className="mt-3">Emergency</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-600">15+</h3>
            <p className="mt-3">Departments</p>
          </div>
        </div>
      </section>
      {/* Services */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="shadow-lg rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">
                Cardiology
              </h3>
              <p>Heart specialist consultation and treatment.</p>
            </div>
            <div className="shadow-lg rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">
                Neurology
              </h3>
              <p>Brain and nervous system treatment.</p>
            </div>
            <div className="shadow-lg rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">
                Orthopedics
              </h3>
              <p>Bone and joint care by expert doctors.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center mt-10">
        © 2026 Hospital Management System | All Rights Reserved
      </footer>
    </div>
  );
}
export default Home;