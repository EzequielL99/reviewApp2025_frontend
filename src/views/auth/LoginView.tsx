import ErrorMessage from "@/components/ErrorMessage";
import { UserLoginForm } from "@/types/index";
import { useForm } from "react-hook-form";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const handleLogin = (formData: UserLoginForm) => {};

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-normal text-xl">
            Email
          </label>

          <input
            type="email"
            id="email"
            placeholder="Email de Registro"
            className="w-full p-3 border-gray-300 border"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-normal text-xl">
            Password
          </label>

          <input
            type="password"
            placeholder="Password de registro"
            className="w-full p-3 border-gray-300 border"
            {...register("password", {
              required: "La password es obligatoria",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesion"
          className="bg-red-600 hover:bg-red-700 w-full p-3 text-white font-black text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
