import { Link } from "wouter";
import { Car as CarType } from "@shared/schema";
import { Calendar, Fuel, Gauge, ArrowRight } from "lucide-react";

interface CarCardProps {
  car: CarType;
}

export function CarCard({ car }: CarCardProps) {
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <Link href={`/inventory/${car.id}`} className="block group h-full">
      <div className="h-full bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
          <img
            src={car.images[0]}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-white/10 text-white">
            {car.condition}
          </div>
          {car.availability !== "Disponible" && (
            <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xl font-bold uppercase tracking-widest text-white border-2 border-white px-6 py-2 rounded">
                {car.availability}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                {car.make} {car.model}
              </h3>
              <p className="text-zinc-400 text-sm">{car.bodyType}</p>
            </div>
            <p className="text-lg font-bold text-primary">
              {formatter.format(Number(car.price))}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 my-4 py-4 border-t border-white/5 border-b">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Calendar className="w-4 h-4 text-primary/70" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Gauge className="w-4 h-4 text-primary/70" />
              <span>{car.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Fuel className="w-4 h-4 text-primary/70" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <div className="w-4 h-4 rounded-full border border-zinc-600" style={{ backgroundColor: car.exteriorColor.toLowerCase() }}></div>
              <span className="truncate">{car.exteriorColor}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500 group-hover:text-white transition-colors">
              Voir détails
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-zinc-950 transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
