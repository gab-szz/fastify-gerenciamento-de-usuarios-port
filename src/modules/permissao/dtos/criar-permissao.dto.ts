import z from 'zod';

export const criarPermissaoSchema = z.object({
  nome: z.string().min(4),
  descricao: z.string().optional(),
});

export type criarPermissaoDTO = z.infer<typeof criarPermissaoSchema>;
