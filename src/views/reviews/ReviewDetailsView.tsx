import { getReviewById } from "@/api/ReviewAPI";
import IssuesTabList from "@/components/issues/IssuesTabList";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

const statusTranslations: { [key: string]: string } = {
  noIssues: "Sin problemas",
  hasIssues: "Tiene problemas",
  underReview: "Bajo revision",
  approved: "Aprobado",
};

const statusBgColors: { [key: string]: string } = {
  noIssues: "bg-emerald-500",
  hasIssues: "bg-red-500",
  underReview: "bg-amber-500",
  approved: "bg-emerald-500",
};

const statusTextColors: { [key: string]: string } = {
  noIssues: "text-white",
  hasIssues: "text-red-500",
  underReview: "text-amber-500",
  approved: "text-white",
};

export default function ReviewDetailsView() {
  const params = useParams();
  const reviewId = params.reviewId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => getReviewById(reviewId),
    retry: false,
  });

  if (isLoading) return "cargando...";
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <>
        <div className="flex items-center">
          <h1 className="text-5xl font-black p-0 m-0 mr-5">
            {data.reviewName}
          </h1>
          <span
            className={`text-xs block uppercase mt-2 font-medium ${
              statusBgColors[data.status] + ' ' + statusTextColors[data.status]
            } py-2 px-4 rounded-3xl`}
          >
            {statusTranslations[data.status]}
          </span>
        </div>

        <p className="text-2xl font-light text-gray-500 my-5">
          {data.description}
        </p>

        <IssuesTabList issues={data.issues} />
      </>
    );
}
