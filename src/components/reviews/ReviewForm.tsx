import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import FileInput from "./FileInput";
import { ReviewFormData } from "types";

type ReviewFormProps = {
  control: Control<ReviewFormData>;
  register: UseFormRegister<ReviewFormData>;
  errors: FieldErrors<ReviewFormData>;
};

export default function ReviewForm({
  control,
  register,
  errors,
}: ReviewFormProps) {
  return (
    <>
      <Controller
        name="fileToReview"
        control={control}
        rules={{ required: "Debe cargar al menos un archivo" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FileInput onChange={onChange} value={value} error={error} />
        )}
      />

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
        <label htmlFor="description" className="text-sm uppercase font-bold">
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
    </>
  );
}
