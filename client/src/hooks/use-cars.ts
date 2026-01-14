import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, "") || "";
const hasApi = Boolean(API_BASE);

// GET /api/cars — use api.cars.list.path
export function useCars(featured?: boolean) {
  return useQuery({
    queryKey: [api.cars.list.path, { featured }],
    queryFn: async () => {
      // If backend URL is provided, hit the API; otherwise fallback to static data.json (Netlify/static deploy)
      if (hasApi) {
        const url = featured
          ? `${API_BASE}${api.cars.list.path}?featured=true`
          : `${API_BASE}${api.cars.list.path}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch cars');
        return api.cars.list.responses[200].parse(await res.json());
      }

      const res = await fetch("/data.json");
      if (!res.ok) throw new Error('Failed to fetch cars');
      const data = api.cars.list.responses[200].parse(await res.json());
      return featured ? data.filter((car) => car.isFeatured) : data;
    },
  });
}

// GET /api/cars/:id
export function useCar(id: number) {
  return useQuery({
    queryKey: [api.cars.get.path, id],
    queryFn: async () => {
      if (hasApi) {
        const url = `${API_BASE}${buildUrl(api.cars.get.path, { id })}`;
        const res = await fetch(url);
        if (res.status === 404) return null;
        if (!res.ok) throw new Error('Failed to fetch car details');
        return api.cars.get.responses[200].parse(await res.json());
      }

      const res = await fetch("/data.json");
      if (!res.ok) throw new Error('Failed to fetch car details');
      const list = api.cars.list.responses[200].parse(await res.json());
      const car = list.find((c) => c.id === id);
      return car ?? null;
    },
    enabled: !!id,
  });
}
