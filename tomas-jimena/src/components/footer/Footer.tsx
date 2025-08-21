export default function Footer() {
  return (
    <footer className="w-full h-[40px] bg-gray-800 text-gray-300 text-sm px-6 flex flex-col sm:flex-row justify-between items-center mt-3">
      <p>© 2025 MyApp. All rights reserved.</p>
      <ul className="flex gap-4">
        <li>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-white">
            Terms
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}
