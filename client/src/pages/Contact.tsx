import { MapPin, Phone, Mail, Clock } from "lucide-react";

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
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Nous visiter</h3>
                  <p className="text-zinc-400">123 Boulevard de la Performance<br />District Automobile, Paris 75001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Nous appeler</h3>
                  <p className="text-zinc-400">Ventes : +33 (0)1 23 45 67 89<br />Service : +33 (0)1 98 76 54 32</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                  <p className="text-zinc-400">ventes@zanaauto.fr<br />support@zanaauto.fr</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Horaires d'ouverture</h3>
                  <p className="text-zinc-400">Lun - Ven : 9:00 - 20:00<br />Samedi : 10:00 - 18:00<br />Dimanche : Fermé</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side (Placeholder) */}
          <div className="h-full min-h-[400px] bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-500 font-medium">Emplacement de la carte interactive</p>
              </div>
            </div>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 pointer-events-none border-[6px] border-zinc-950/20 rounded-3xl" />
          </div>

        </div>
      </div>
    </div>
  );
}
