import { Service, Inject } from 'fastify-decorators';
import { Usuario } from '../domain/usuario.domain.js';
import type { criarUsuarioDTO } from '../dtos/criar-usuario.dto.js';
import type { IUsuarioRepository } from '../infra/usuario.repository.interface.js';
import { UsuarioRepository } from '../infra/usuario.repository.js';

@Service()
export class CriarUsuarioUseCase {
  @Inject(UsuarioRepository)
  private readonly repository!: IUsuarioRepository;

  constructor(repository?: IUsuarioRepository) {
    if (repository) this.repository = repository;
  }

  async exec(input: criarUsuarioDTO): Promise<Usuario> {
    const existente = await this.repository.consultarPorLogin(input.login);
    if (existente) {
      throw new Error('Usuário já existe com esse login');
    }
    const usuario = Usuario.criar(input);
    return await this.repository.inserir(usuario);
  }
}
