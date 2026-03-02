import { Endereco } from '../domain/endereco.domain.js';
import type { criarEnderecoDTO } from '../endereco.type.js';
import type { IEnderecoRepository } from '../infra/endereco.repository.js';

export class CriarEnderecoUseCase {
  constructor(private readonly repository: IEnderecoRepository) {}

  async executar(input: criarEnderecoDTO) {
    const endereco = Endereco.criar(input);
    return await this.repository.inserir(endereco);
  }
}
