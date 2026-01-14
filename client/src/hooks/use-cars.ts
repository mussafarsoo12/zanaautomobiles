import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// GET /api/cars — use api.cars.list.path
export function useCars(featured?: boolean) {
  return useQuery({
    queryKey: [api.cars.list.path, { featured }],
    queryFn: async () => {
      // Build query string manually if needed since api.cars.list.input is optional
      const url = featured ? `${api.cars.list.path}?featured=true` : api.cars.list.path;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch cars');
      return api.cars.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/cars/:id
export function useCar(id: number) {
  return useQuery({
    queryKey: [api.cars.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.cars.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch car details');
      return api.cars.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
