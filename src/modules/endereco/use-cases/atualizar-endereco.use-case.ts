import { Service, Inject } from 'fastify-decorators';
import type { Endereco } from '../domain/endereco.domain.js';
import type { atualizarEnderecoDTO } from '../endereco.type.js';
import type { IEnderecoRepository } from '../infra/endereco.repository.interface.js';
import { EnderecoRepository } from '../infra/endereco.repository.js';

@Service()
export class AtualizarEnderecoUseCase {
  @Inject(EnderecoRepository)
  private readonly repository!: IEnderecoRepository;

  constructor(repository?: IEnderecoRepository) {
    if (repository) this.repository = repository;
  }

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
