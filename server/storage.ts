import fs from "fs";
import path from "path";
import { type InsertCar, type Car } from "@shared/schema";

export interface IStorage {
  getCars(featured?: boolean): Promise<Car[]>;
  getCar(id: number): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
}

// File-based storage for development without a database
class FileStorage implements IStorage {
  private filePath: string;
  private data: Car[] | null = null;

  constructor() {
    this.filePath = path.resolve(process.cwd(), "server", "data.json");
  }

  private async load(): Promise<Car[]> {
    if (this.data) return this.data;
    try {
      const raw = await fs.promises.readFile(this.filePath, "utf-8");
      this.data = JSON.parse(raw) as Car[];
    } catch (e) {
      this.data = [];
    }
    return this.data;
  }

  private async persist(): Promise<void> {
    if (!this.data) return;
    await fs.promises.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.promises.writeFile(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
  }

  async getCars(featured?: boolean): Promise<Car[]> {
    const data = await this.load();
    if (featured) return data.filter((c) => c.isFeatured);
    // return newest first by id if id exists
    return [...data].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
  }

  async getCar(id: number): Promise<Car | undefined> {
    const data = await this.load();
    return data.find((c) => c.id === id);
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const data = await this.load();
    const nextId = data.reduce((max, c) => Math.max(max, c.id ?? 0), 0) + 1;
    const newCar = { ...(insertCar as any), id: nextId } as Car;
    data.push(newCar);
    await this.persist();
    return newCar;
  }
}

// Database-backed storage that dynamically imports `./db` to avoid hard failure
class DatabaseStorage implements IStorage {
  async getCars(featured?: boolean) {
    const { db } = await import("./db");
    const { cars } = await import("@shared/schema");
    const { eq, desc } = await import("drizzle-orm");
    if (featured) {
      return await db.select().from(cars).where(eq(cars.isFeatured, true));
    }
    return await db.select().from(cars).orderBy(desc(cars.id));
  }

  async getCar(id: number) {
    const { db } = await import("./db");
    const { cars } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    const [car] = await db.select().from(cars).where(eq(cars.id, id));
    return car;
  }

  async createCar(insertCar: InsertCar) {
    const { db } = await import("./db");
    const { cars } = await import("@shared/schema");
    const [car] = await db.insert(cars).values(insertCar).returning();
    return car;
  }
}

const storage: IStorage = process.env.DATABASE_URL ? new DatabaseStorage() : new FileStorage();

export { storage };
