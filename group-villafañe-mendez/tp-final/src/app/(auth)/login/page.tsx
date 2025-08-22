import Link from "next/link";
import FormLogin from "./components/FormLogin";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center mx-2">
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold dark:text-white text-center mb-6">
          Inicia sesión en tu cuenta
        </h2>

        <FormLogin />

        <p className="text-gray-400 text-sm text-center mt-6">
          ¿No tienes una cuenta?{" "}
          <Link href="#" className="text-blue-400 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
