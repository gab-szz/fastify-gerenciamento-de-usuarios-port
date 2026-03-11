import type { Endereco } from '../domain/endereco.domain.js';
import type { EnderecoRepository } from '../infra/endereco.repository.js';

export class ExcluirEnderecoUseCase {
  constructor(private readonly repository: EnderecoRepository) {}

  async executar(id: number) {
    const endereco = await this.validarSeEnderecoExiste(id);
    return await this.repository.atualizar(endereco.excluir());
  }

  private async validarSeEnderecoExiste(id: number): Promise<Endereco> {
    const endereco = await this.repository.consultarPorId(id);
    if (!endereco) {
      throw new Error('Not Exists');
    }
    return endereco;
  }
}
