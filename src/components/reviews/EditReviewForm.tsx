import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Review, ReviewFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updateReview } from "@/api/ReviewAPI";
import { toast } from "react-toastify";

type EditReviewFormProps = {
  data: ReviewFormData;
  reviewId: Review["_id"];
};

export default function EditReviewForm({
  data,
  reviewId,
}: EditReviewFormProps) {
  const navigate = useNavigate();

  const initialValues: ReviewFormData = {
    reviewName: data.reviewName,
    description: data.description,
    fileToReview: null, // Para satisfacer el Type, pero para la edición no tiene utilidad
  };

  const { mutate } = useMutation({
    mutationFn: updateReview,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>({ defaultValues: initialValues });

  const handleForm = (formData: ReviewFormData) => {
    const data = {
      formData,
      reviewId,
    };

    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Revisión</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Completa el siguiente formulario para editar los datos de una revisión
        </p>

        <nav className="mt-10">
          <Link
            className="bg-red-400 hover:bg-red-500 text-white px-10 py-3 font-bold text-xl cursor-pointer transition-colors"
            to="/"
          >
            Volver al Inicio
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div className="mb-7 space-y-3">
            <label htmlFor="reviewName" className="text-sm uppercase font-bold">
              Nombre de la revision
            </label>
            <input
              id="reviewName"
              className="w-full p-3 border border-gray-200"
              type="text"
              placeholder="Nombre de la revision"
              {...register("reviewName", {
                required: "El nombre de la revision es obligatorio",
              })}
            />
            {errors.reviewName && (
              <ErrorMessage>{errors.reviewName.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-7 space-y-3">
            <label
              htmlFor="description"
              className="text-sm uppercase font-bold"
            >
              Descripción
            </label>
            <textarea
              id="description"
              className="w-full p-3 border border-gray-200"
              placeholder="Descripción de la revisión"
              {...register("description", {
                required: "La descripcion de la revision es obligatoria",
              })}
            />

            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-red-600 hover:bg-red-700 text-white p-3 w-full uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
