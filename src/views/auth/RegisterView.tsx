import ErrorMessage from "@/components/ErrorMessage";
import { UserRegistrationForm } from "@/types/index";
import { useForm } from "react-hook-form";

const roleList = {
  developer: "Desarrollador",
  auditor: "Auditor",
  dev_aud: "Desarrollador y Auditor",
};

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => {};

  return (
    <>
      <h1 className="text-5xl font-black text-gray-800">Crear cuenta</h1>
      <p className="text-2xl font-light text-gray-800 mt-5">
        Llena el formulario para {""}
        <span className="text-red-600 font-bold">crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-normal text-xl">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de Registro"
            className="w-full p-3 border-gray-300 border"
            {...register("email", {
              required: "El email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no valido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className="font-normal text-xl">
            Nombre
          </label>

          <input
            type="text"
            id="name"
            placeholder="Nombre de Registro"
            className="w-full p-3 border-gray-300 border"
            {...register("name", {
              required: "El nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-normal text-xl">
            Password
          </label>

          <input
            type="password"
            id="password"
            placeholder="Password de Registro"
            className="w-full p-3 border-gray-300 border"
            {...register("password", {
              required: "La password es obligatoria",
              minLength: {
                value: 8,
                message: "La password debe ser minimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password_confirmation"
            className="font-normal text-xl"
          >
            Repetir Password
          </label>

          <input
            type="password"
            id="password_confirmation"
            placeholder="Repite Password de Registro"
            className="w-full p-3 border-gray-300 border"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Las passwords no son iguales",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="font-normal text-xl">
            Rol
          </label>

          <select
            id="role"
            className="w-full p-3 border-gray-300 border"
            {...register("role", {
              required: "Debes escoger un rol",
            })}
          >
            <option value="" selected disabled>
              --Selecciona un Rol--
            </option>
            {Object.entries(roleList).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          {errors.role && (
            <ErrorMessage>{errors.role.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Registrarme"
          className="bg-red-600 hover:bg-red-700 w-full p-3 text-white font-black text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
