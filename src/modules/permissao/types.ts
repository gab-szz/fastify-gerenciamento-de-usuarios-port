import z from 'zod';

export const permissaoSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(4),
  descricao: z.string().optional(),
  criadoEm: z.date().optional(),
  atualizadoEm: z.date().optional(),
});

export type PermissaoType = z.infer<typeof permissaoSchema>;

export const permissaoIdParamSchema = z.object({
  id: z.coerce.number().min(1),
});
export const permissaoNomeParamSchema = z.object({ nome: z.string() });

export const permissaoResponseSchema = z.object({
  id: z.number(),
  nome: z.string(),
  descricao: z.string().optional(),
  criadoEm: z.date().optional(),
  atualizadoEm: z.date().optional(),
});
