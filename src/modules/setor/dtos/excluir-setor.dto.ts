import z from 'zod';

export const excluirSetorSchema = z.object({
  id: z.coerce.number().min(1),
});

export type excluirSetorDTO = z.infer<typeof excluirSetorSchema>;
