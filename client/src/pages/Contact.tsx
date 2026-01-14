import { MapPin, Clock, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-0 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-20">
          
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-display font-bold text-white mb-6">Contactez-nous</h1>
              <p className="text-xl text-zinc-400 leading-relaxed">
                Visitez notre salle d'exposition pour découvrir notre collection en personne. Notre équipe est prête à vous aider pour toute demande.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Nous écrire</h3>
                  <a
                    href="mailto:Zana.automobiles@gmail.com"
                    className="text-zinc-200 hover:text-white font-medium transition-colors"
                  >
                    Zana.automobiles@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Nous visiter</h3>
                  <p className="text-zinc-400">Av. de Lucens 30, 1510 Moudon</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Horaires d'ouverture</h3>
                  <div className="text-zinc-400">
                    <div>Lundi‑Vendredi<br /><span className="font-medium">9h00‑17h00</span></div>
                    <div className="mt-1">Samedi et Dimanche<br /><span className="font-medium">Fermé</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="h-full min-h-[400px] bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden relative">
            <iframe
              title="Zana Automobiles - map"
              src="https://www.google.com/maps?q=46.6722472,6.806153&z=15&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
