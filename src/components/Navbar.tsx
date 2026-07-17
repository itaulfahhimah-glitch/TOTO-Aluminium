import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Hammer, Shield, Compass } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Beranda" },
    { id: "portfolio", label: "Portofolio" },
    { id: "calculator", label: "Kalkulator Estimasi" },
    { id: "consultant", label: "Konsultasi AI" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Kontak & Lokasi" },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800 py-3"
          : "bg-slate-950/60 backdrop-blur-xs py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-md overflow-hidden border border-slate-800 group-hover:scale-105 transition-all">
              <img 
                src="/logo.png" 
                alt="Logo Toto Aluminium" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-white text-lg tracking-wide group-hover:text-sky-400 transition-colors">
                TOTO <span className="text-sky-500">ALUMINIUM</span>
              </span>
              <p className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                Premium Glass & Aluminium
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md font-display font-medium text-xs tracking-wide uppercase transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-sky-400 bg-slate-800/60"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="https://wa.me/6285862492586?text=Halo%20Toto%20Aluminium%2C%20saya%20tertarik%20untuk%20konsultasi%20kusen%20dan%20kaca."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg font-display font-semibold text-xs tracking-wide uppercase shadow-lg shadow-sky-600/25 transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Survei Gratis</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-[64px] bg-slate-950/98 backdrop-blur-lg z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 border-t border-slate-900">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3.5 rounded-lg font-display font-semibold text-sm tracking-wide uppercase transition-colors ${
                activeSection === item.id
                  ? "text-sky-400 bg-slate-900 border-l-4 border-sky-500"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/50"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 px-4">
            <a
              href="https://wa.me/6285862492586?text=Halo%20Toto%20Aluminium%2C%20saya%20tertarik%20untuk%20konsultasi%20kusen%20dan%20kaca."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full bg-sky-600 hover:bg-sky-500 text-white py-3 rounded-lg font-display font-semibold text-xs tracking-wide uppercase shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi WA Surveyor</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
