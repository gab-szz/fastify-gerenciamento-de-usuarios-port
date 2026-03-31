import z from 'zod';

export const consultarSetorPorNomeSchema = z.object({
  nome: z.string().min(3),
});

export const consultarSetorPorIdSchema = z.object({
  id: z.coerce.number().min(1),
});
