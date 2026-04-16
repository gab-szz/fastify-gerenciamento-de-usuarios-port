import type { Endereco } from '../domain/endereco.domain.js';

export interface IEnderecoRepository {
  inserir(endereco: Endereco): Promise<Endereco>;
  consultarPorId(id: number): Promise<Endereco | null>;
  consultarTodos(): Promise<Endereco[]>;
  atualizar(endereco: Endereco): Promise<Endereco | null>;
  remover(endereco: Endereco): Promise<boolean>;
}
