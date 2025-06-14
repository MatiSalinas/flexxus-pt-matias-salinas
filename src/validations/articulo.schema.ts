import { z } from 'zod';

export const articleSchema = z.object({
  id_articulos: z.number().optional(),
  nombre: z.string().max(80),
  marca: z.string().max(80),
  fecha_modificacion: z.date(),
  activo: z.union([z.enum(["0", "1"]), z.number().min(0).max(1)]),
});

export const articlesListSchema = z.array(articleSchema);

export const articleResponseSchema = z.object({
  success: z.boolean(),
  data: articleSchema
});

export const articlesListResponseSchema = z.object({
  success: z.boolean(),
  data: articlesListSchema
});

export const articleQuerySchema = z.object({
  limit: z
    .string()
    .transform((val) => (val === undefined ? 20 : Number(val)))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 100, {
      message: "limit must be a number between 1 and 100",
    })
    .default("20"),
  offset: z
    .string()
    .transform((val) => (val === undefined ? 0 : Number(val)))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "offset must be a number greater or equal to 0",
    })
    .default("0"),
  isActivo: z.enum(["1", "0"]).optional(),
  nombre: z.string().optional(),
});

export const articuloParamSchema = z.object({
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