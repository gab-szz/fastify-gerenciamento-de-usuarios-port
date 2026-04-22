import { Service, Inject } from 'fastify-decorators';
import type { IUsuarioRepository } from '../infra/usuario.repository.interface.js';
import { UsuarioRepository } from '../infra/usuario.repository.js';

@Service()
export class ConsultarUsuarioUseCase {
  @Inject(UsuarioRepository)
  private readonly repository!: IUsuarioRepository;

  constructor(repository?: IUsuarioRepository) {
    if (repository) this.repository = repository;
  }

  async todos() {
    return await this.repository.consultarTodos();
  }

  async porId(id: number) {
    return await this.repository.consultarPorId(id);
  }

  async porLogin(login: string) {
    return await this.repository.consultarPorLogin(login);
  }
}
