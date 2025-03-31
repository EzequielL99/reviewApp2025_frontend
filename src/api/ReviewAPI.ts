import { dashboardReviewSchema, Review, ReviewFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createReview(formData: ReviewFormData) {
  try {
    const { data } = await api.post("/reviews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (error.response.data.errors) {
        throw new Error(error.response.data.errors[0].msg);
      } else if (error.response.data.error) {
        throw new Error(error.response.data.error);
      }
    }
  }
}

export async function getReviews() {
  try {
    const { data } = await api("/reviews");

    const response = dashboardReviewSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getReviewById(id: Review['_id']) {
  try {
    const { data } = await api(`/reviews/${id}`);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type UpdateReviewAPIType = {
  formData: ReviewFormData,
  reviewId: Review['_id']
}

export async function updateReview({formData, reviewId}: UpdateReviewAPIType) {
  try {
    const { data } = await api.put<string>(`/reviews/${reviewId}`, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}


