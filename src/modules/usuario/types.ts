import z from 'zod';

export const usuarioSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(4),
  dataNascimento: z.coerce.date().optional(),
  login: z.string().email(),
  senha: z.string(),
  perfilId: z.number().optional(),
  setorId: z.number().optional(),
  enderecosId: z.array(z.number()).optional(),
  ativo: z.boolean(),
  dataCriacao: z.date(),
  dataAtualizacao: z.date().optional(),
  dataExclusao: z.date().optional(),
});

export type UsuarioType = z.infer<typeof usuarioSchema>;

export const usuarioIdParamSchema = z.object({ id: z.coerce.number().min(1) });

export const usuarioResponseSchema = z.object({
  id: z.number().optional(),
  nome: z.string(),
  dataNascimento: z.date().optional(),
  login: z.string(),
  perfilId: z.number().optional(),
  setorId: z.number().optional(),
  ativo: z.boolean(),
  dataCriacao: z.date(),
  dataAtualizacao: z.date().optional(),
  dataExclusao: z.date().optional(),
});
