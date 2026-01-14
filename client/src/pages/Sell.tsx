import { motion } from "framer-motion";
import { Phone, Mail, Camera, DollarSign, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Sell() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-white mb-6">Vendez votre voiture aujourd'hui</h1>
          <p className="text-xl text-zinc-400">
            Vous souhaitez vendre votre véhicule ? Contactez-nous pour une estimation rapide.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Camera, title: "Envoyez les détails", desc: "Soumettez des photos et des détails de votre véhicule en ligne ou rendez-nous visite." },
            { icon: DollarSign, title: "Recevez une offre", desc: "Recevez une évaluation compétitive basée sur les données du marché en temps réel." },
            { icon: Clock, title: "Paiement rapide", desc: "Acceptez notre offre — c'est simple et rapide." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 text-center hover:border-primary/30 transition-colors"
            >
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Methods - single mailto button retained per request */}
        <div className="max-w-2xl mx-auto bg-zinc-900 border border-white/5 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-black/50">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold text-white">Envoyer des photos</h2>
            <p className="text-zinc-400 mt-2">Envoyez-nous des photos de votre véhicule pour recevoir une estimation.</p>
          </div>
          <a
            href="mailto:Zana.automobiles@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-zinc-950 font-bold py-3 px-6 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Envoyer des photos
          </a>
        </div>

      </div>
    </div>
  );
}
