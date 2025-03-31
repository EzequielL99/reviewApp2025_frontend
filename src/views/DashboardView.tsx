import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/api/ReviewAPI";
import ReviewGrid from "@/components/reviews/ReviewGrid";

export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  if (isLoading) return "Cargando...";

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Inicio</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Una estadística de todas tus tareas
        </p>

        <nav className="my-10">
          <Link
            className="bg-red-400 hover:bg-red-500 text-white px-10 py-3 font-bold text-xl cursor-pointer transition-colors"
            to="/reviews/create"
          >
            Nueva revisión
          </Link>
        </nav>

        {data.length ? (
          <ReviewGrid reviews={data} />
        ) : (
          <p className="text-center py-20">
            No hay revisiones aún {""}
            <Link to={"/reviews/create"} className="text-red-500 font-bold">
              Crear Revisión
            </Link>
          </p>
        )}
      </>
    );
}
