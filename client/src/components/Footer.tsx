import { Link } from "wouter";
import { Instagram, MapPin, Mail, Car } from "lucide-react";

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
                ZANA <span className="text-primary">AUTOMOBILES</span>
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Découvrez le summum de l'automobile d'occasion. Nous sélectionnons uniquement les meilleurs véhicules pour garantir fiabilité et satisfaction.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.instagram.com/zanaautomobiles/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-zinc-500 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Explorer</h4>
            <ul className="space-y-3">
              {[
                { label: "Inventaire", href: "/inventory" },
                { label: "Vendre votre voiture", href: "/sell" },
                { label: "Financement", href: "#" },
                { label: "À propos", href: "#" },
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
                <span>Av. de Lucens 30, 1510 Moudon</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>Zana.automobiles@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Horaires</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="text-white">9:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span className="text-primary">Fermé</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-primary">Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
          <p>© 2026 Zana Automobiles. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0" />
        </div>
      </div>
    </footer>
  );
}
