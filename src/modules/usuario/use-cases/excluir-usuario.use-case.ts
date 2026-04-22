import { Service, Inject } from 'fastify-decorators';
import type { Usuario } from '../domain/usuario.domain.js';
import type { IUsuarioRepository } from '../infra/usuario.repository.interface.js';
import { UsuarioRepository } from '../infra/usuario.repository.js';

@Service()
export class ExcluirUsuarioUseCase {
  @Inject(UsuarioRepository)
  private readonly repository!: IUsuarioRepository;

  constructor(repository?: IUsuarioRepository) {
    if (repository) this.repository = repository;
  }

  async exec(id: number): Promise<Usuario> {
    const usuario = await this._validarSeUsuarioExiste(id);
    return await this.repository.atualizar(usuario.excluir());
  }

  private async _validarSeUsuarioExiste(id: number): Promise<Usuario> {
    const usuario = await this.repository.consultarPorId(id);
    if (!usuario) {
      throw new Error(`Usuario com ID ${id} nao encontrado`);
    }
    return usuario;
  }
}
