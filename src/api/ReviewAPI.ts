import { ReviewFormData } from "@/types/index";
import api from "@/lib/axios";

export async function createReview(formData: ReviewFormData) {
  try {
    const { data } = await api.post("/reviews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
