import { getReviewById } from "@/api/ReviewAPI";
import EditReviewForm from "@/components/reviews/EditReviewForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function EditReviewView() {
  const params = useParams();
  const reviewId = params.reviewId!;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["editReview", reviewId],
    queryFn: () => getReviewById(reviewId),
    retry: false,
  });

  if (isLoading) return "cargando...";
  if (isError) return <Navigate to="/404" />;

  if(data) return (
    <EditReviewForm data={data} reviewId={reviewId}/>
  )
}
