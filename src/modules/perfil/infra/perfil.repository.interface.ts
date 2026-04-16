import type { Perfil } from '../domain/perfil.domain.js';

export interface IPerfilRepository {
  consultarTodos(): Promise<Perfil[]>;
  consultarPorId(id: number): Promise<Perfil | null>;
  consultarPorNome(nome: string): Promise<Perfil | null>;
  inserir(input: Perfil): Promise<Perfil | null>;
  atualizar(input: Perfil): Promise<Perfil | null>;
  remover(perfil: Perfil): Promise<boolean>;
}
