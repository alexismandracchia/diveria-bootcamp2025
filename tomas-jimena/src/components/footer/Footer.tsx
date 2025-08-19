export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-sm px-6 py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p>© 2025 MyApp. All rights reserved.</p>
        <ul className="flex gap-4 mt-2 sm:mt-0">
          <li><a href="#" className="hover:text-white">Privacy</a></li>
          <li><a href="#" className="hover:text-white">Terms</a></li>
          <li><a href="#" className="hover:text-white">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
