import { pgTable, text, serial, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  price: numeric("price").notNull(),
  mileage: integer("mileage").notNull(),
  fuelType: text("fuel_type").notNull(),
  transmission: text("transmission").notNull(),
  bodyType: text("body_type").notNull(),
  condition: text("condition").notNull(), // New, Used
  exteriorColor: text("exterior_color").notNull(),
  interiorColor: text("interior_color").notNull(),
  availability: text("availability").notNull().default("Available"), // Available, Sold, Reserved
  images: text("images").array().notNull(), // Array of URLs
  features: text("features").array().notNull(),
  description: text("description").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
});

export const insertCarSchema = createInsertSchema(cars).omit({ id: true });

export type Car = typeof cars.$inferSelect;
export type InsertCar = z.infer<typeof insertCarSchema>;
