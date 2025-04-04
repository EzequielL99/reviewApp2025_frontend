import { getReviewById } from "@/api/ReviewAPI";
import IssuesList from "@/components/issues/IssuesList";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function ReviewDetailsView() {
  const params = useParams();
  const reviewId = params.reviewId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editReview", reviewId],
    queryFn: () => getReviewById(reviewId),
    retry: false,
  });

  if (isLoading) return "cargando...";
  if (isError) return <Navigate to="/404" />;

  if(data) return (
    <>
      <h1 className="text-5xl font-black">{data.reviewName}</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

      <IssuesList 
        issues={data.issues}
      />
    </>
  )
}
