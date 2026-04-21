import z from 'zod';

export const setorSchema = z.object({
  id: z.coerce.number().optional(),
  nome: z.string().min(4),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});

export type setorType = z.infer<typeof setorSchema>;

export const setorIdParamSchema = z.object({ id: z.coerce.number().min(1) });
export const setorNomeParamSchema = z.object({ nome: z.string() });

export const setorResponseSchema = z.object({
  id: z.number(),
  nome: z.string(),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});
