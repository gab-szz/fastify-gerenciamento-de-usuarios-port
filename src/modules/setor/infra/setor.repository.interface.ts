import type { Setor } from '../domain/setor.domain.js';

export interface ISetorRepository {
  inserir(setor: Setor): Promise<Setor>;
  consultarPorId(id: number): Promise<Setor | null>;
  consultarPorNome(nome: string): Promise<Setor[]>;
  consultarTodos(): Promise<Setor[]>;
  atualizar(setor: Setor): Promise<Setor | null>;
  remover(setor: Setor): Promise<boolean>;
}
