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
      return res.status(400).json({ message: "Invalid ID" });
    }
    const car = await storage.getCar(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
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
        fuelType: "Petrol",
        transmission: "Automatic",
        bodyType: "Coupe",
        condition: "Used",
        exteriorColor: "Obsidian Black",
        interiorColor: "Black Nappa Leather",
        availability: "Available",
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1600"],
        features: ["Panamericana Grille", "Active Aerodynamics", "Burmester Sound", "Track Pace App"],
        description: "A stunning example of the AMG GT, finished in Obsidian Black with low mileage. This vehicle combines raw power with luxury touring capabilities.",
        isFeatured: true
      },
      {
        make: "Porsche",
        model: "911 Carrera S",
        year: 2023,
        price: "128000",
        mileage: 3200,
        fuelType: "Petrol",
        transmission: "PDK",
        bodyType: "Coupe",
        condition: "Used",
        exteriorColor: "Gentian Blue",
        interiorColor: "Slate Grey",
        availability: "Available",
        images: ["https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1600"],
        features: ["Sport Chrono Package", "Sport Exhaust", "PASM", "18-way Seats"],
        description: "The benchmark sports car. Finished in Gentian Blue Metallic, this 911 Carrera S offers the perfect balance of performance and daily usability.",
        isFeatured: true
      },
      {
        make: "Audi",
        model: "RS6 Avant",
        year: 2024,
        price: "145000",
        mileage: 500,
        fuelType: "Petrol",
        transmission: "Automatic",
        bodyType: "Wagon",
        condition: "New",
        exteriorColor: "Nardo Grey",
        interiorColor: "Cognac Brown",
        availability: "Reserved",
        images: ["https://images.unsplash.com/photo-1603584173870-7b299f589389?auto=format&fit=crop&q=80&w=1600"],
        features: ["Carbon Black Pack", "Ceramic Brakes", "B&O Advanced Sound", "Panoramic Roof"],
        description: "The ultimate super wagon. Nardo Grey exterior with contrasting Carbon Black styling package.",
        isFeatured: false
      },
      {
        make: "BMW",
        model: "M4 Competition",
        year: 2023,
        price: "89000",
        mileage: 4500,
        fuelType: "Petrol",
        transmission: "Automatic",
        bodyType: "Coupe",
        condition: "Used",
        exteriorColor: "Isle of Man Green",
        interiorColor: "Silverstone",
        availability: "Available",
        images: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600"],
        features: ["M Carbon Bucket Seats", "Laserlights", "Head-up Display", "Harman Kardon"],
        description: "Aggressive styling and track-ready performance. This M4 Competition stands out in Isle of Man Green.",
        isFeatured: true
      }
    ];

    for (const car of sampleCars) {
      await storage.createCar(car);
    }
  }
}
