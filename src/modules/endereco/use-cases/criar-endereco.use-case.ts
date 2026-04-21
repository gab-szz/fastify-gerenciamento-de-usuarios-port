import { Service, Inject } from 'fastify-decorators';
import { Endereco } from '../domain/endereco.domain.js';
import type { criarEnderecoDTO } from '../types.js';
import type { IEnderecoRepository } from '../infra/endereco.repository.interface.js';
import { EnderecoRepository } from '../infra/endereco.repository.js';

@Service()
export class CriarEnderecoUseCase {
  @Inject(EnderecoRepository)
  private readonly repository!: IEnderecoRepository;

  constructor(repository?: IEnderecoRepository) {
    if (repository) this.repository = repository;
  }

  async executar(input: criarEnderecoDTO) {
    const endereco = Endereco.criar(input);
    return await this.repository.inserir(endereco);
  }
}
