"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });

export default function SkripsiOnline() {
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      Object.keys(sectionsRef.current).forEach((id) => {
        const section = sectionsRef.current[id];
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top <= 100) {
            currentSection = id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Nulla facilisi. 
  Donec at ligula eget felis aliquet volutpat. Aenean ut orci ac justo suscipit scelerisque. Phasellus at erat a turpis faucibus 
  ultricies sed et dui. Duis tincidunt consectetur nunc, nec ullamcorper massa eleifend a. Cras eget magna at nisl auctor 
  hendrerit at ut turpis. Vestibulum id mi ut sapien fermentum luctus.`;

  return (
    <div className="relative">
      {/* Navbar tetap di atas dengan z-50 */}
      <Navbar />

      {/* Sticky Heading tetap di atas, tidak ikut naik saat scroll */}
      <div className="sticky top-[60px] bg-gray-900 text-white p-3 text-center font-bold shadow-lg z-40 w-full">
        {activeSection || "Mulai Membaca"}
      </div>

      <div className="p-5 space-y-10 max-w-4xl mx-auto">
        {["Pendahuluan", "Landasan Teori", "Metodologi", "Hasil dan Pembahasan", "Kesimpulan"].map((bab) => (
          <div
            key={bab}
            id={bab}
            ref={(el) => (sectionsRef.current[bab] = el)}
            className="h-screen border-b-2 p-5 relative"
          >
            {/* Judul Bab hanya sticky di dalam section */}
            <h2 className="text-2xl font-bold sticky top-0 bg-gray-800 text-white p-2 shadow-md w-full">
              {bab}
            </h2>
            <p className="mt-3 text-justify leading-relaxed">{loremText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
