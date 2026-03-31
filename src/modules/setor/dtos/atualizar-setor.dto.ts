import z from 'zod';

export const atualizarSetorSchema = z.object({
  id: z.coerce.number().min(1),
  nome: z.string().min(4),
});

export type atualizarSetorDTO = z.infer<typeof atualizarSetorSchema>;
