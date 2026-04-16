import { Service, Inject } from 'fastify-decorators';
import { Perfil } from '../domain/perfil.domain.js';
import type { criarPerfilDTO } from '../dtos/criar-perfil.dto.js';
import type { IPerfilRepository } from '../infra/perfil.repository.interface.js';
import { PerfilRepository } from '../infra/perfil.repository.js';

@Service()
export class CriarPerfilUseCase {
  @Inject(PerfilRepository)
  private readonly rep!: IPerfilRepository;

  async exec(input: criarPerfilDTO) {
    const perfil = Perfil.criar(input);
    return this.rep.inserir(perfil);
  }
}
