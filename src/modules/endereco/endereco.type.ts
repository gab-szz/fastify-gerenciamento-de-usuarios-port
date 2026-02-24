import z from 'zod';

// Schema completo da entidade ENDEREÇO
export const enderecoSchema = z.object({
  id: z.coerce.number().optional(),
  rua: z.string().min(3),
  cidade: z.string().min(3),
  estado: z.string().min(2),
  cep: z.string().min(7),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});

/*
 * SCHEMAS PARA DTOS
 */
export const criarEnderecoSchema = z.object({
  rua: z.string().min(3),
  cidade: z.string().min(3),
  estado: z.string().min(2),
  cep: z.string().min(7),
});

export const consultarEnderecoPorIdSchema = z.object({
  id: z.coerce.number(),
});

export const atualizarEnderecoSchema = z.object({
  id: z.coerce.number(),
  rua: z.string().min(3),
  cidade: z.string().min(3),
  estado: z.string().min(2),
  cep: z.string().min(7),
});

export const excluirEnderecoSchema = z.object({
  id: z.coerce.number(),
});

/*
 * EXPORTAÇÃO DE TYPES E DTOS
 */
export type enderecoType = z.infer<typeof enderecoSchema>;
export type criarEnderecoDTO = z.infer<typeof criarEnderecoSchema>;
export type atualizarEnderecoDTO = z.infer<typeof atualizarEnderecoSchema>;
export type excluirEnderecoDTO = z.infer<typeof excluirEnderecoSchema>;
