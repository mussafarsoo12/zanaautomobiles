import { useCars } from "@/hooks/use-cars";
import { CarCard } from "@/components/CarCard";
import { useState } from "react";
import { Search, ExternalLink } from "lucide-react";

export default function Inventory() {
  const { data: cars, isLoading, error } = useCars();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCars = cars?.filter(car => 
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">Inventaire</h1>
            <p className="text-zinc-400">Affichage de {filteredCars?.length || 0} véhicules premium</p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Rechercher par marque ou modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <a
              href="https://www.autoscout24.ch/fr/s/seller-2497810"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 md:px-4 py-3 bg-primary text-zinc-950 font-semibold md:font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-900/20 text-sm md:text-base leading-tight whitespace-normal md:whitespace-nowrap"
            >
              Voir nos véhicules sur Autoscout
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[16/10] bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Impossible de charger l'inventaire</h3>
            <p className="text-zinc-500 mb-4">Le serveur d'API n'est pas disponible ou mal configuré.</p>
            <p className="text-zinc-400">Vérifiez la variable d'environnement <strong>VITE_API_BASE</strong> ou le déploiement de votre backend.</p>
          </div>
        ) : filteredCars && filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4">
              <Search className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Aucun véhicule trouvé</h3>
            <p className="text-zinc-500">Essayez d'ajuster vos termes de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}
