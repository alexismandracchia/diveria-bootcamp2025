import LoginForm from "@/components/users/LoginForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
      {/* Sección de presentación */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to My Store
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Please log in to access your account.
        </p>
      </section>

      {/* Formulario de login */}
      <section className="w-full max-w-md">
        <LoginForm />
      </section>
    </main>
  );
}
