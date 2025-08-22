import Link from "next/link";

export default function CatchAll404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page not found.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        Go Home
      </Link>
    </div>
  );
}
