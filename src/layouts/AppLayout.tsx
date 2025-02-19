import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";

export default function AppLayout() {

  return (
    <>
      <header className="bg-slate-200 py-5 border-b-2 border-gray-300">
        <div className="max-w-screen-xl mx-auto flex lg:flex-row justify-between items-center">
          <div className="w-32">
            <Logo />
          </div>

          <h1 className="uppercase text-red-600 font-bold">Code Checker</h1>

        </div>
      </header>

      <section className="max-w-screen-xl mx-auto mt-10">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
