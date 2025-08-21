import { PublicOnlyRoute } from "./components/PublicOnlyRoute";
import Link from "next/link";
import FormLogin from "./components/FormLogin";

const page = () => {
  return (
    <PublicOnlyRoute>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center mx-2">
        <div className=" p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold dark:text-white text-center mb-6">
            Sign in to your account
          </h2>

          <FormLogin />

          <p className="text-gray-400 text-sm text-center mt-6">
            Don’t have an account?{" "}
            <Link href="#" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </PublicOnlyRoute>
  );
};

export default page;
