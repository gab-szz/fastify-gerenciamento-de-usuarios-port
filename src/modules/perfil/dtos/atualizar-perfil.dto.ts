import z from 'zod';

export const atualizarPerfilSchema = z.object({
  id: z.coerce.number(),
  nome: z.string().min(4),
});

export type atualizarPerfilDTO = z.infer<typeof atualizarPerfilSchema>;
