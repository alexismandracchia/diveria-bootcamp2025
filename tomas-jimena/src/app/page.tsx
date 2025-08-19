import LoginForm from "@/components/users/LoginForm";

export default function Home() {
  return (
    <main>
      {/* Sección de presentación */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 ">
          Welcome to My Store
        </h1>
        <p className="text-lg ">
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
