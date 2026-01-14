import { Link, useLocation } from "wouter";
import { Car, Menu, X, Phone, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/inventory", label: "Inventory" },
    { href: "/sell", label: "Sell Your Car" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-emerald-300 rounded-lg flex items-center justify-center transform transition-transform group-hover:rotate-3 shadow-lg shadow-primary/20">
              <Car className="w-6 h-6 text-zinc-950" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              ZANA<span className="text-primary">AUTO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link 
              href="/contact"
              className="bg-primary hover:bg-emerald-400 text-zinc-950 font-bold px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/20 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-medium px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.href) 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5">
                <Link 
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary text-zinc-950 font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
