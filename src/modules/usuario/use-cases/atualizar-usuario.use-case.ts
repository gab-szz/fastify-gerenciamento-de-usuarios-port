import { Service, Inject } from 'fastify-decorators';
import type { Usuario } from '../domain/usuario.domain.js';
import type { atualizarUsuarioDTO } from '../dtos/atualizar-usuario.dto.js';
import type { IUsuarioRepository } from '../infra/usuario.repository.interface.js';
import { UsuarioRepository } from '../infra/usuario.repository.js';

@Service()
export class AtualizarUsuarioUseCase {
  @Inject(UsuarioRepository)
  private readonly repository!: IUsuarioRepository;

  constructor(repository?: IUsuarioRepository) {
    if (repository) this.repository = repository;
  }

  async exec(input: atualizarUsuarioDTO): Promise<Usuario> {
    const usuario = await this._validarSeUsuarioExiste(input.id);
    return await this.repository.atualizar(usuario.atualizar(input));
  }

  private async _validarSeUsuarioExiste(id: number): Promise<Usuario> {
    const usuario = await this.repository.consultarPorId(id);
    if (!usuario) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }
}
