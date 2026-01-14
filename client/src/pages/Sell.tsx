import { motion } from "framer-motion";
import { Phone, Mail, Camera, DollarSign, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Sell() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-white mb-6">Sell Your Car Today</h1>
          <p className="text-xl text-zinc-400">
            We offer fair market value for premium vehicles. No hassle, immediate payment, and we handle all the paperwork.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Camera, title: "Send Details", desc: "Submit photos and details of your vehicle online or visit us." },
            { icon: DollarSign, title: "Get Offer", desc: "Receive a competitive appraisal based on real-time market data." },
            { icon: Clock, title: "Fast Payment", desc: "Accept our offer and get paid the same day. It's that simple." }
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

        {/* Contact Methods */}
        <div className="max-w-2xl mx-auto bg-zinc-900 border border-white/5 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-black/50">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Get Your Appraisal Now</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="tel:+15551234567"
              className="flex-1 py-4 bg-primary text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call For Appraisal
            </a>
            <a 
              href="mailto:acquisitions@zanaauto.com"
              className="flex-1 py-4 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Photos
            </a>
          </div>
          <p className="mt-8 text-sm text-zinc-500">
            For fastest service, please have your VIN and mileage ready.
          </p>
        </div>

      </div>
    </div>
  );
}
