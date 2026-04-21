import z from 'zod';

export const perfilSchema = z.object({
  id: z.coerce.number().optional(),
  nome: z.string().min(4),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});

export type perfilType = z.infer<typeof perfilSchema>;

export const perfilIdParamSchema = z.object({ id: z.coerce.number().min(1) });

export const perfilResponseSchema = z.object({
  id: z.number(),
  nome: z.string(),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});
