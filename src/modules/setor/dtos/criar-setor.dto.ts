import z from 'zod';

export const criarSetorSchema = z.object({
  nome: z.string().min(4),
});

export type criarSetorDTO = z.infer<typeof criarSetorSchema>;
