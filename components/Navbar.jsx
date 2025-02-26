"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Portfolio</h1>

        {/* Tombol Menu Mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`md:flex flex-col md:flex-row md:space-x-6 absolute md:static top-14 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${isOpen ? "flex" : "hidden"
            }`}
        >
          {["About", "Skills", "Services", "Portfolio", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block md:inline-block py-2 px-4 hover:bg-gray-800 rounded-lg transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
