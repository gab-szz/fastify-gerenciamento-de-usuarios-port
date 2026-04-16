import { Service, Inject } from 'fastify-decorators';
import type { Endereco } from '../domain/endereco.domain.js';
import type { IEnderecoRepository } from '../infra/endereco.repository.interface.js';
import { EnderecoRepository } from '../infra/endereco.repository.js';

@Service()
export class ExcluirEnderecoUseCase {
  @Inject(EnderecoRepository)
  private readonly repository!: IEnderecoRepository;

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
