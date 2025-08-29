"use client";

import { useState } from "react";
import Link from "next/link";
import { useScroll } from "@/hooks/useScroll"; 
import { useAuth } from "@/context/AuthProvider"; 
import { BiLogOut } from "react-icons/bi";

type NavLink = { href: string; label: React.ReactNode; onClick?: () => void; };
const baseLinks: NavLink[] = [ { href: "/", label: "Home" }];
const guestLinks: NavLink[] = [ { href: "/login", label: "Sign In" } ];
const authLinks: NavLink[] = [ { href: "/dashboard", label: "Dashboard" } ];

interface NavProps { links: NavLink[]; onLinkClick?: () => void; }

const Logo = () => (
  <div className="text-white text-2xl font-bold">
    <Link href="/">MyApp</Link>
  </div>
);

const DesktopNav = ({ links }: NavProps) => (
  <ul className="hidden md:flex space-x-8 text-white text-lg">
    {links.map(({ href, label, onClick }) => (
      <li key={href}> 
        <Link href={href} onClick={onClick} className="flex items-center gap-x-2 hover:text-green-400 transition">
          {label}
        </Link>
      </li>
    ))}
  </ul>
);

const HamburgerButton = ({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) => {
  const genericHamburgerLine = "block h-1 w-8 bg-white rounded transition-all duration-300";
  return (
    <button
      onClick={onClick}
      className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
    >
      <span className={`${genericHamburgerLine} ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
      <span className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : ""}`} />
      <span className={`${genericHamburgerLine} ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
    </button>
  );
};

const MobileNav = ({ links, isOpen, onLinkClick }: NavProps & { isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-gray-900 md:hidden">
      <ul className="flex flex-col items-center space-y-6 py-6 text-white text-lg">
        {links.map(({ href, label, onClick }) => (
          <li key={href}>
            <Link href={href} onClick={() => { onClick?.(); onLinkClick?.(); }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScroll(50);
  const { isAuthenticated, logout } = useAuth(); 

  const finalNavLinks = isAuthenticated
    ? [
        ...baseLinks,
        ...authLinks,
        { href: "#", label: <BiLogOut size={25} className="text-red-700" title="Cerrar sesión"/>, onClick: logout },
      ]
    : [
        ...baseLinks,
        ...guestLinks
      ];

  const navbarClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-300
    ${isScrolled
      ? "bg-gray-900/80 backdrop-blur-md shadow-md py-2"
      : "bg-gray-900/30 backdrop-blur-md py-4"}
  `;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />
        <DesktopNav links={finalNavLinks} />
        <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>
      <MobileNav
        links={finalNavLinks}
        isOpen={isOpen}
        onLinkClick={() => setIsOpen(false)}
      />
    </nav>
  );
};

export default Navbar;