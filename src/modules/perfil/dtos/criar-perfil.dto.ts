import z from 'zod';

export const criarPerfilSchema = z.object({
  nome: z.string().min(4),
});

export type criarPerfilDTO = z.infer<typeof criarPerfilSchema>;
