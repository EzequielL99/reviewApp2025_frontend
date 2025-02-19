import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Inicio</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Una estadística de todas tus tareas
      </p>

      <nav className="mt-10">
        <Link
          className="bg-red-400 hover:bg-red-500 text-white px-10 py-3 font-bold text-xl cursor-pointer transition-colors"
          to="/reviews/create"
        >
          Nueva revisión
        </Link>
      </nav>
    </>
  );
}
