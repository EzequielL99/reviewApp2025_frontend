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
    if (isAxiosError(error)) {
      console.log(error.response?.data.errors);
    }
    console.error(error);
    return "ERROR: Por favor, vuelve a intentarlo.";
  }
}
