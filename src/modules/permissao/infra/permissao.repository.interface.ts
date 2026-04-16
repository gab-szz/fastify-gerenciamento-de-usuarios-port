import type { Permissao } from '../domain/permissao.domain.js';

export interface IPermissaoRepository {
  consultarPorId(id: number): Promise<Permissao | null>;
  consultarPorNome(nome: string): Promise<Permissao | null>;
  consultarTodas(): Promise<Permissao[]>;
  salvar(permissao: Permissao): Promise<Permissao | null>;
  remover(id: number): Promise<boolean>;
}
