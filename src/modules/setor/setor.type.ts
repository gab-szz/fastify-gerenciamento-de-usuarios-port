import z from 'zod';

// Schema completo da entidade SETOR
export const setorSchema = z.object({
  id: z.coerce.number().optional(),
  nome: z.string().min(4),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});

export type setorType = z.infer<typeof setorSchema>;
