import { useCars } from "@/hooks/use-cars";
import { Link } from "wouter";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import { CarCard } from "@/components/CarCard";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: featuredCars, isLoading: loadingFeatured } = useCars(true);
  const { data: allCars, isLoading: loadingRecent } = useCars();
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });

  // Filter recent arrivals (just taking the last 4 from all cars for demo)
  const recentCars = allCars?.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden flex items-center">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-zinc-900">
          {/* Landing page hero scenic mountain landscape */}
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2400&q=80" 
            alt="Luxury Sports Car"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
              <Star className="w-3.5 h-3.5 fill-primary" />
              <span>Sélection 2026</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
              Bienvenue chez
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200">Zana Automobiles</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed max-w-lg">
              Découvrez une collection de véhicules d'occasion rigoureusement sélectionnés. La voiture qu'il vous faut vous attend chez Zana Automobiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/inventory"
                className="px-8 py-4 bg-primary text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/30 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Voir l'inventaire
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/sell"
                className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center justify-center"
              >
                Vendre votre voiture
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-zinc-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Qualité Certifiée", 
                desc: "Véhicules soigneusement contrôlés." 
              },
              { 
                icon: Zap, 
                title: "Financement Instantané", 
                desc: "Obtenez une approbation avec nos taux compétitifs et nos plans de paiement flexibles." 
              },
              { 
                icon: Star, 
                title: "Service Premium", 
                desc: "Vivez une expérience de service exceptionnelle dès votre première visite et bien après votre achat." 
              }
            ].map((feature, i) => (
              <div key={i} className="bg-zinc-900/30 p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl text-white font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Carousel (Mobile Optimized) */}
      <section className="py-24 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Véhicules en vente</h2>
            <p className="text-zinc-400">Sélectionnés pour leur performance et leur style</p>
          </div>
          <Link href="/inventory" className="hidden md:flex items-center gap-2 text-primary hover:text-emerald-300 font-medium transition-colors">
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingFeatured ? (
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden md:max-w-7xl md:mx-auto md:px-4" ref={emblaRef}>
            <div className="flex md:grid md:grid-cols-3 gap-6 px-4 md:px-0">
              {featuredCars?.map((car) => (
                <div key={car.id} className="flex-[0_0_85%] min-w-0 md:flex-auto pl-4 first:pl-0 md:pl-0">
                  <CarCard car={car} />
                </div>
              ))}
              {(!featuredCars || featuredCars.length === 0) && (
                <div className="col-span-full text-center py-12 text-zinc-500">
                  Aucun véhicule en vedette disponible pour le moment.
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Recent Arrivals */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Arrivages récents</h2>
            <p className="text-zinc-400">Nouvel inventaire ajouté cette semaine</p>
          </div>

          {loadingRecent ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="h-80 bg-zinc-900 rounded-2xl animate-pulse" />
               ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentCars?.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link 
              href="/inventory"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-zinc-700 text-white font-medium hover:bg-zinc-800 transition-colors"
            >
              Parcourir tout l'inventaire
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
          <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Prêt à trouver votre voiture ?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link 
                href="/contact"
                className="px-8 py-4 bg-primary text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-900/40 hover:-translate-y-1"
              >
                Planifier un essai routier
              </Link>
              <Link 
                href="/inventory"
                className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-all hover:-translate-y-1"
              >
                Parcourir l'inventaire
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
