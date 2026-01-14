import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary to-emerald-300 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-zinc-950" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                ZANA<span className="text-primary">AUTO</span>
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Experience the pinnacle of automotive excellence. We curate only the finest vehicles for discerning drivers who demand performance and luxury.
            </p>
            <div className="flex space-x-4 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="text-zinc-500 hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: "Inventory", href: "/inventory" },
                { label: "Sell Your Car", href: "/sell" },
                { label: "Financing", href: "#" },
                { label: "About Us", href: "#" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-zinc-400 hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Performance Blvd,<br />Automotive District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>sales@zanaauto.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Hours</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-white">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">10:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-primary">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
          <p>© 2024 Zana Automobiles. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
