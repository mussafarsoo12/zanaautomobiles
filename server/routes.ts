import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
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
        exteriorColor: "Noir",
        interiorColor: "Cuir",
        availability: "Disponible",
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1600"],
        features: ["AMG Line", "4Matic", "9G-Tronic", "Expertisée"],
        description: "Date de mise en circulation : 06.2019. Puissance : 390 PS (287 kW). Consommation mixte : 12.6 l/100 km. Transmission : 4 roues motrices. Expertisée : Oui (14.06.2022).",
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
        model: "Qashqai",
        year: 2009,
        price: "1900",
        mileage: 349000,
        fuelType: "Diesel",
        transmission: "Automatique",
        bodyType: "SUV / Tout-terrain",
        condition: "Occasion",
        exteriorColor: "Gris",
        interiorColor: "Tissu",
        availability: "Vendu",
        images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1600"],
        features: ["4 roues motrices", "150 PS", "Diesel"],
        description: "12.2009. Diesel. 349'000 km. 150 PS (110 kW). Automatique. 7.9 l/100 km.",
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
        exteriorColor: "Bleu",
        interiorColor: "Tissu",
        availability: "Disponible",
        images: ["https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1600"],
        features: ["Swiss Plus Edition", "Traction avant", "126 PS"],
        description: "07.2009. Essence. 198'000 km. 126 PS (93 kW). Automatique. 6.9 l/100 km.",
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
        exteriorColor: "Gris",
        interiorColor: "Cuir",
        availability: "Disponible",
        images: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c15d?auto=format&fit=crop&q=80&w=1600"],
        features: ["Privilège Luxe", "Cabriolet", "Expertisée"],
        description: "04.2006. Essence. 271'000 km. 163 PS (120 kW). Boîte manuelle. 8 l/100 km. Dernière MFK : 14.10.2025.",
        isFeatured: true
      }
    ];

    for (const car of sampleCars) {
      await storage.createCar(car);
    }
  }
}
