import z from 'zod';

// Schema completo da entidade SETOR
export const setorSchema = z.object({
  id: z.coerce.number().optional(),
  nome: z.string().min(4),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});

/*
 * SCHEMAS PARA DTOS
 */
export const criarSetorSchema = z.object({
  nome: z.string().min(4),
});

export const consultarSetorPorNomeSchema = z.object({
  nome: z.string().min(3),
});

export const consultarSetorPorIdSchema = z.object({
  id: z.coerce.number().min(1),
});

export const atualizarSetorSchema = z.object({
  id: z.coerce.number().min(1),
  nome: z.string().min(4),
});

export const excluirSetorSchema = z.object({
  id: z.coerce.number().min(1),
});

/*
 * EXPORTAÇÃO DE TYPES E DTOS
 */
export type setorType = z.infer<typeof setorSchema>;
export type criarSetorDTO = z.infer<typeof criarSetorSchema>;
export type atualizarSetorDTO = z.infer<typeof atualizarSetorSchema>;
export type excluirSetorDTO = z.infer<typeof excluirSetorSchema>;
