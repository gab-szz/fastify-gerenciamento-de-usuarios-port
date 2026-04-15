import type { Endereco } from '../domain/endereco.domain.js';
import type { atualizarEnderecoDTO } from '../endereco.type.js';
import type { IEnderecoRepository } from '../infra/endereco.repository.js';

export class AtualizarEnderecoUseCase {
  constructor(private readonly repository: IEnderecoRepository) {}

  async executar(input: atualizarEnderecoDTO) {
    const endereco = await this.validarSeEnderecoExiste(input.id);
    return await this.repository.atualizar(endereco.atualizar(input));
  }

  private async validarSeEnderecoExiste(id: number): Promise<Endereco> {
    const endereco = await this.repository.consultarPorId(id);
    if (!endereco) {
      throw new Error(`Endereço com ID ${id} não encontrado`);
    }
    return endereco;
  }
}
