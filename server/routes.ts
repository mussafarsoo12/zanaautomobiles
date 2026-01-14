import type { Express } from "express";
import express from "express";
import path from "path";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/attached_assets", express.static(path.resolve(process.cwd(), "attached_assets")));

  app.get(api.cars.list.path, async (req, res) => {
    const featured = req.query.featured === 'true';
    const cars = await storage.getCars(featured);
    res.json(cars);
  });

  app.get(api.cars.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }
    const car = await storage.getCar(id);
    if (!car) {
      return res.status(404).json({ message: "Véhicule non trouvé" });
    }
    res.json(car);
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingCars = await storage.getCars();
  if (existingCars.length === 0) {
    const sampleCars = [
      {
        make: "Mercedes-Benz",
        model: "GLE Coupé 43 AMG 4Matic",
        year: 2019,
        price: "39000",
        mileage: 117000,
        fuelType: "Essence",
        transmission: "Automatique",
        bodyType: "SUV / Tout-terrain",
        condition: "Occasion",
        exteriorColor: "Blanc",
        interiorColor: "Cuir Noir",
        availability: "Disponible",
        images: [
          "@assets/1_1768400605092.jpeg",
          "@assets/6_1768400605093.jpeg",
          "@assets/7_1768400605093.jpeg",
          "@assets/2_1768400605093.jpeg",
          "@assets/4_1768400605093.jpeg",
          "@assets/8_1768400605093.jpeg",
          "@assets/3_1768400605094.jpeg",
          "@assets/5_1768400605093.jpeg"
        ],
        features: ["AMG Line", "4Matic", "9G-Tronic", "Sièges chauffants", "Toit ouvrant", "Expertisée"],
        description: "Date de mise en circulation : 06.2019. Mercedes GLE 43 AMG Coupé. Véhicule très propre, entretenu régulièrement. Pack AMG complet, sonorité exceptionnelle. Expertisée récemment.",
        isFeatured: true
      },
      {
        make: "VW",
        model: "Fox 1.4",
        year: 2006,
        price: "4200",
        mileage: 43000,
        fuelType: "Essence",
        transmission: "Manuelle",
        bodyType: "Petite voiture",
        condition: "Occasion",
        exteriorColor: "Gris",
        interiorColor: "Tissu",
        availability: "Disponible",
        images: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c15d?auto=format&fit=crop&q=80&w=1600"],
        features: ["Traction avant", "Expertisée", "Dernière MFK : 27.06.2025"],
        description: "08.2006. 75 PS (55 kW). Consommation : 6.8 l/100 km. Expertise récente.",
        isFeatured: true
      },
      {
        make: "Nissan",
        model: "Qashqai+2",
        year: 2009,
        price: "1900",
        mileage: 349000,
        fuelType: "Diesel",
        transmission: "Automatique",
        bodyType: "SUV / Tout-terrain",
        condition: "Occasion",
        exteriorColor: "Gris clair métal",
        interiorColor: "Tissu",
        availability: "Vendu",
        images: [
          "@assets/1_1768400697795.png",
          "@assets/2_1768400697795.jpeg",
          "@assets/4_1768400697795.jpeg",
          "@assets/3_1768400697795.jpeg",
          "@assets/5_1768400697795.jpeg"
        ],
        features: ["4 roues motrices", "150 PS", "Diesel", "7 places", "Expertisée"],
        description: "12.2009. Nissan Qashqai+2 (7 places). Diesel. 349'813 km. 150 PS (110 kW). Automatique. 4WD. Expertise faite le 14.07.2022.",
        isFeatured: false
      },
      {
        make: "Hyundai",
        model: "i30",
        year: 2009,
        price: "1900",
        mileage: 198000,
        fuelType: "Essence",
        transmission: "Automatique",
        bodyType: "Berline",
        condition: "Occasion",
        exteriorColor: "Gris foncé",
        interiorColor: "Tissu",
        availability: "Disponible",
        images: [
          "@assets/1_1768400339063.jpeg",
          "@assets/3_1768400339065.jpeg",
          "@assets/4_1768400339065.jpeg",
          "@assets/6_1768400339064.jpeg",
          "@assets/7_1768400339065.jpeg"
        ],
        features: ["Swiss Plus Edition", "Traction avant", "126 PS", "Expertisée"],
        description: "07.2009. Essence. 198'000 km. 126 PS (93 kW). Automatique. 6.9 l/100 km. Expertise faite le 06.07.2022.",
        isFeatured: true
      },
      {
        make: "Fiat",
        model: "500 1.4",
        year: 2009,
        price: "3800",
        mileage: 137000,
        fuelType: "Essence",
        transmission: "Manuelle",
        bodyType: "Petite voiture",
        condition: "Occasion",
        exteriorColor: "Gris",
        interiorColor: "Beige",
        availability: "Disponible",
        images: [
          "@assets/1_1768400154338.jpeg",
          "@assets/2_1768400154338.jpeg",
          "@assets/3_1768400154339.jpeg",
          "@assets/4_1768400154338.jpeg",
          "@assets/5_1768400154338.jpeg",
          "@assets/6_1768400154338.jpeg",
          "@assets/7_1768400154338.jpeg",
          "@assets/8_1768400154338.jpeg",
          "@assets/9_1768400154338.jpeg",
          "@assets/10_1768400154338.jpeg",
          "@assets/11_1768400154338.jpeg",
          "@assets/12_1768400154339.jpeg",
          "@assets/13_1768400154339.jpeg",
          "@assets/14_1768400154338.jpeg",
          "@assets/15_1768400154338.jpeg"
        ],
        features: ["Toit ouvrant", "Sport", "Expertisée", "Dernière MFK : 01.07.2024"],
        description: "05.2009. Essence. 137'000 km. 100 PS (73 kW). Boîte manuelle. 6.3 l/100 km. Contrôle technique OK. Magnifique Fiat 500 avec toit ouvrant panoramique.",
        isFeatured: true
      },
      {
        make: "Renault",
        model: "Mégane C-C 2.0",
        year: 2006,
        price: "2500",
        mileage: 271000,
        fuelType: "Essence",
        transmission: "Manuelle",
        bodyType: "Cabriolet",
        condition: "Occasion",
        exteriorColor: "Bleu",
        interiorColor: "Cuir Noir",
        availability: "Disponible",
        images: [
          "@assets/1_1768400778949.jpeg",
          "@assets/7_1768400778949.jpeg",
          "@assets/4_1768400778949.jpeg",
          "@assets/2_1768400778950.jpeg",
          "@assets/6_1768400778949.jpeg",
          "@assets/11_1768400778949.jpeg",
          "@assets/9_1768400778950.jpeg",
          "@assets/5_1768400778950.jpeg",
          "@assets/3_1768400778950.jpeg",
          "@assets/10_1768400778949.jpeg"
        ],
        features: ["Privilège Luxe", "Cabriolet", "Sièges en cuir", "Expertisée", "Dernière MFK : 15.12.2023"],
        description: "04.2006. Renault Mégane II 2.0 16V Cabriolet. Essence. 271'000 km. 163 PS (120 kW). Boîte manuelle. Expertise récente (MFK) du 15.12.2023. Véhicule cabriolet idéal pour l'été.",
        isFeatured: true
      }
    ];

    for (const car of sampleCars) {
      await storage.createCar(car);
    }
  }
}
