import { z } from 'zod';
import { insertCarSchema, cars } from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  cars: {
    list: {
      method: 'GET' as const,
      path: '/api/cars',
      input: z.object({
        featured: z.string().optional(), // Pass 'true' to filter
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof cars.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/cars/:id',
      responses: {
        200: z.custom<typeof cars.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
