import { Service, Inject } from 'fastify-decorators';
import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import type { ISetorRepository } from '../infra/setor.repository.interface.js';
import { SetorRepository } from '../infra/setor.repository.js';

@Service()
export class ConsultarSetorUseCases {
  @Inject(SetorRepository)
  private readonly repository!: ISetorRepository;

  constructor(repository?: ISetorRepository) {
    if (repository) this.repository = repository;
  }

  async porId(id: number) {
    if (!id || id < 0) {
      throw new ErroRegraNegocio('A valid ID must be provided.');
    }
    return await this.repository.consultarPorId(id);
  }

  async porNome(nome: string) {
    if (!nome || nome.length === 0) {
      throw new ErroRegraNegocio('A valid Name must be provided.');
    }
    return await this.repository.consultarPorNome(nome);
  }

  async todos() {
    return await this.repository.consultarTodos();
  }
}
