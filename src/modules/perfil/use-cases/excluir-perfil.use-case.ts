import { Service, Inject } from 'fastify-decorators';
import type { Perfil } from '../domain/perfil.domain.js';
import type { IPerfilRepository } from '../infra/perfil.repository.interface.js';
import { PerfilRepository } from '../infra/perfil.repository.js';

@Service()
export class ExcluirPerfilUseCase {
  @Inject(PerfilRepository)
  private readonly rep!: IPerfilRepository;

  async exec(id: number) {
    const perfil = await this.consultarPerfil(id);
    perfil.excluir();
    return await this.rep.atualizar(perfil);
  }

  private async consultarPerfil(id: number): Promise<Perfil> {
    const perfil = await this.rep.consultarPorId(id);
    if (!perfil) {
      throw new Error(`Não foi encontrado um perfil com id ${id}`);
    }
    return perfil;
  }
}
