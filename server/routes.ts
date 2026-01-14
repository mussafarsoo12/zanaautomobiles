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
        model: "AMG GT",
        year: 2024,
        price: "135000",
        mileage: 1500,
        fuelType: "Essence",
        transmission: "Automatique",
        bodyType: "Coupé",
        condition: "Occasion",
        exteriorColor: "Noir Obsidienne",
        interiorColor: "Cuir Nappa Noir",
        availability: "Disponible",
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1600"],
        features: ["Calandre Panamericana", "Aérodynamisme actif", "Système Burmester", "Application Track Pace"],
        description: "Un superbe exemplaire de l'AMG GT, fini en Noir Obsidienne avec un faible kilométrage. Ce véhicule allie puissance brute et luxe.",
        isFeatured: true
      },
      {
        make: "Porsche",
        model: "911 Carrera S",
        year: 2023,
        price: "128000",
        mileage: 3200,
        fuelType: "Essence",
        transmission: "PDK",
        bodyType: "Coupé",
        condition: "Occasion",
        exteriorColor: "Bleu Gentiane",
        interiorColor: "Gris Ardoise",
        availability: "Disponible",
        images: ["https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1600"],
        features: ["Pack Sport Chrono", "Échappement Sport", "PASM", "Sièges 18 réglages"],
        description: "La référence des voitures de sport. Finie en Bleu Gentiane Métallisé, cette 911 Carrera S offre l'équilibre parfait entre performance et usage quotidien.",
        isFeatured: true
      },
      {
        make: "Audi",
        model: "RS6 Avant",
        year: 2024,
        price: "145000",
        mileage: 500,
        fuelType: "Essence",
        transmission: "Automatique",
        bodyType: "Break",
        condition: "Neuf",
        exteriorColor: "Gris Nardo",
        interiorColor: "Brun Cognac",
        availability: "Réservé",
        images: ["https://images.unsplash.com/photo-1603584173870-7b299f589389?auto=format&fit=crop&q=80&w=1600"],
        features: ["Pack Noir Carbone", "Freins Céramique", "Son B&O Advanced", "Toit Panoramique"],
        description: "Le break ultime. Extérieur Gris Nardo avec pack style Noir Carbone contrasté.",
        isFeatured: false
      },
      {
        make: "BMW",
        model: "M4 Competition",
        year: 2023,
        price: "89000",
        mileage: 4500,
        fuelType: "Essence",
        transmission: "Automatique",
        bodyType: "Coupé",
        condition: "Occasion",
        exteriorColor: "Vert Isle of Man",
        interiorColor: "Silverstone",
        availability: "Disponible",
        images: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600"],
        features: ["Sièges Baquets M Carbone", "Phares Laser", "Affichage Tête Haute", "Harman Kardon"],
        description: "Design agressif et performances de piste. Cette M4 Competition se démarque en Vert Isle of Man.",
        isFeatured: true
      }
    ];

    for (const car of sampleCars) {
      await storage.createCar(car);
    }
  }
}
