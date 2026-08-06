import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-blue-600 text-white py-24 text-center">
        <h1 className="text-5xl font-bold">
          Welcome to Hospital Management System
        </h1>
        <p className="mt-6 text-xl">
          Book appointments with doctors quickly and easily.
        </p>
        <Link
          to="/doctors"
          className="inline-block mt-8 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold"
        >
          Book Appointment
        </Link>
      </section>
    </div>
  );
}
export default Home;