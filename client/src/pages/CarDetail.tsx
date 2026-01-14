import { useCar } from "@/hooks/use-cars";
import { useRoute, Link } from "wouter";
import { 
  ArrowLeft, Calendar, Fuel, Gauge, Share2, Phone, Mail, CheckCircle2,
  ChevronRight, MapPin
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CarDetail() {
  const [match, params] = useRoute("/inventory/:id");
  const id = parseInt(params?.id || "0");
  const { data: car, isLoading, error } = useCar(id);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-display font-bold text-white mb-4">Véhicule non trouvé</h2>
        <p className="text-zinc-400 mb-8">Le véhicule que vous recherchez a peut-être été vendu ou retiré.</p>
        <Link href="/inventory" className="px-6 py-3 bg-primary text-zinc-950 font-bold rounded-lg hover:bg-emerald-400 transition-colors">
          Retour à l'inventaire
        </Link>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/inventory" className="hover:text-primary transition-colors">Inventaire</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white truncate">{car.year} {car.make} {car.model}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative group">
                <img 
                  src={car.images[activeImage].startsWith('@assets/') ? car.images[activeImage].replace('@assets/', '/attached_assets/') : car.images[activeImage]} 
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border border-white/10 text-white">
                  {car.condition}
                </div>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                      idx === activeImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.startsWith('@assets/') ? img.replace('@assets/', '/attached_assets/') : img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-zinc-900/30 p-8 rounded-2xl border border-white/5">
              <h2 className="text-2xl font-display font-bold text-white mb-6">Description du véhicule</h2>
              <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed">
                <p>{car.description}</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="bg-zinc-900/30 p-8 rounded-2xl border border-white/5">
              <h2 className="text-2xl font-display font-bold text-white mb-6">Équipements et Options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {car.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Sticky Header info for mobile/tablet flows naturally here, sticky on desktop */}
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 lg:sticky lg:top-24 space-y-8 shadow-xl shadow-black/20">
              
              <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
                  {car.year} {car.make} {car.model}
                </h1>
                <p className="text-zinc-400">{car.mileage.toLocaleString()} km</p>
              </div>

              <div className="flex items-end gap-3 pb-6 border-b border-white/5">
                <span className="text-4xl font-bold text-primary">
                  {formatter.format(Number(car.price))}
                </span>
                <span className="text-zinc-500 mb-1.5 text-sm font-medium">hors taxes et frais</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-950/50 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-zinc-500 block mb-1">Extérieur</span>
                  <span className="text-white font-medium block truncate">{car.exteriorColor}</span>
                </div>
                <div className="bg-zinc-950/50 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-zinc-500 block mb-1">Intérieur</span>
                  <span className="text-white font-medium block truncate">{car.interiorColor}</span>
                </div>
                <div className="bg-zinc-950/50 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-zinc-500 block mb-1">Transmission</span>
                  <span className="text-white font-medium block truncate">{car.transmission}</span>
                </div>
                <div className="bg-zinc-950/50 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-zinc-500 block mb-1">Type de carburant</span>
                  <span className="text-white font-medium block truncate">{car.fuelType}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-primary text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+41786641270">Appeler la concession</a>
                </button>
                <button className="w-full py-4 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:Zana.automobiles@gmail.com">Envoyer un email</a>
                </button>
              </div>

              <div className="pt-4 text-center">
                <p className="text-xs text-zinc-500 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Disponible chez Zana Automobiles
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
