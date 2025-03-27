import { ReviewFormData } from "@/types/index";
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
