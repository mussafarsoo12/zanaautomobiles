import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

const API_BASE = (import.meta.env.VITE_API_BASE as string) ?? "";
const LOCAL_DATA_PATH = "/data.json";

// GET /api/cars — use api.cars.list.path
export function useCars(featured?: boolean) {
  return useQuery({
    queryKey: [api.cars.list.path, { featured }],
    queryFn: async () => {
      // Build query string manually if needed since api.cars.list.input is optional
      const url = featured ? `${api.cars.list.path}?featured=true` : api.cars.list.path;
      const fetchUrl = API_BASE ? `${API_BASE}${url}` : LOCAL_DATA_PATH;
      const res = await fetch(fetchUrl);
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
      const fetchUrl = API_BASE ? `${API_BASE}${url}` : `${LOCAL_DATA_PATH}`;
      const res = await fetch(fetchUrl);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch car details');
      return api.cars.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
