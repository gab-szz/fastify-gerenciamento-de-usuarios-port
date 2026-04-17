import { Service, Inject } from 'fastify-decorators';
import type { IEnderecoRepository } from '../infra/endereco.repository.interface.js';
import { EnderecoRepository } from '../infra/endereco.repository.js';

@Service()
export class ConsultarEnderecoUseCase {
  @Inject(EnderecoRepository)
  private readonly repository!: IEnderecoRepository;

  constructor(repository?: IEnderecoRepository) {
    if (repository) this.repository = repository;
  }

  async porId(id: number) {
    return await this.repository.consultarPorId(id);
  }

  async todos() {
    return await this.repository.consultarTodos();
  }
}
