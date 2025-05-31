import { z } from 'zod';

export const articleSchema = z.object({
  id_articulos: z.number().optional(),
  nombre: z.string().max(80),
  marca: z.string().max(80),
  activo: z.enum(["0", "1"])
});

export const articlesListSchema = z.array(articleSchema);

export const articleQuerySchema = z.object({
  isActivo: z.enum(["1","0"]).optional(),
  nombre: z.string().optional(),
})

export const articleParamSchema = z.object({
  id: z.string()
      .min(1, "ID is required")
      .regex(/^\d+$/, "ID must be a valid number")
});

export const createArticuloSchema = z.object({
  nombre: z.string().min(1, "Nombre is required").max(80, "nombre cannot exceed 80 characters"),
  marca: z.string().min(1, "Marca is required").max(80, "marca cannot exceed 80 characters"),
  activo: z.enum(["0", "1"]).default("1")
});

export const updateArticuloSchema = z.object({
  nombre: z.string().min(0).max(80,"nombre cannot exceed 80 characters").optional(),
  marca: z.string().min(0).max(80,"marca cannot exceed 80 characters").optional(),
  activo: z.enum(["0", "1"]).optional()
});