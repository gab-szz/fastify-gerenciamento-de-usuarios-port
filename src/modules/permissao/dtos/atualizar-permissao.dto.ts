import z from 'zod';

export const atualizarPermissaoBodySchema = z.object({
  nome: z.string().min(4),
  descricao: z.string().optional(),
});

export const atualizarPermissaoSchema = z.object({
  id: z.number(),
  nome: z.string().min(4),
  descricao: z.string().optional(),
});

export type atualizarPermissaoDTO = z.infer<typeof atualizarPermissaoSchema>;
