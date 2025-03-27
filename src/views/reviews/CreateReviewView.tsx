import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, Id } from "react-toastify";
import ReviewForm from "@/components/reviews/ReviewForm";
import { ReviewFormData } from "@/types/index";
import { createReview } from "@/api/ReviewAPI";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

export default function CreateReviewView() {
  const toastId = useRef('' as Id);
  const navigate = useNavigate();

  const initialValues: ReviewFormData = {
    fileToReview: null,
    reviewName: "",
    description: "",
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>({ defaultValues: initialValues });

  const {mutate} = useMutation({
    mutationFn: createReview,
    onError: (error) => {
      toast.update(toastId.current, {
        autoClose: 5000,
        isLoading: false,
        render: error.message,
        type: 'error',
      })
    },
    onSuccess: (data) => {
      toast.update(toastId.current, {
        autoClose: 5000,
        isLoading: false,
        render: data,
        type: 'success',
      })
      navigate('/');
    }
  });

  const handleForm = (formData: ReviewFormData) => {
    toastId.current = toast('Creando tu review', {
      autoClose: false,
      isLoading: true
    });

    mutate(formData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Revisión</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Completa el siguiente formulario para generar una nueva revisión
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
          <ReviewForm control={control} register={register} errors={errors} />

          <input
            type="submit"
            value="Crear Revision"
            className="bg-red-600 hover:bg-red-700 text-white p-3 w-full uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
