import { z } from 'zod';

export const articleSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string(),
  isActive: z.boolean()
});

export const articlesListSchema = z.array(articleSchema);
