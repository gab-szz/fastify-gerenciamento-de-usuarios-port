import z from 'zod';

// Schema completo da entidade PERFIL
export const perfilSchema = z.object({
  id: z.coerce.number().optional(),
  nome: z.string().min(4),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});

export type perfilType = z.infer<typeof perfilSchema>;
