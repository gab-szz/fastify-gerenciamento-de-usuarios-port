import z from 'zod';

export const atualizarSetorBodySchema = z.object({
  nome: z.string().min(4),
});

export const atualizarSetorSchema = z.object({
  id: z.coerce.number().min(1),
  nome: z.string().min(4),
});

export type atualizarSetorDTO = z.infer<typeof atualizarSetorSchema>;
