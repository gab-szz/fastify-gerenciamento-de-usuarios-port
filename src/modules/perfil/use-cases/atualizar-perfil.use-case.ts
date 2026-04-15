import type { Perfil } from '../domain/perfil.domain.js';
import type { atualizarPerfilDTO } from '../dtos/atualizar-perfil.dto.js';
import type { IPerfilRepository } from '../infra/perfil.repository.js';

export class AtualizarPerfilUseCase {
  constructor(private readonly rep: IPerfilRepository) {}

  async exec(input: atualizarPerfilDTO): Promise<Perfil | null> {
    let perfil = await this.rep.consultarPorId(input.id);
    perfil = this.verificarSePerfilExiste(perfil, input.id);

    perfil.atualizar(input.nome);
    return this.rep.atualizar(perfil);
  }

  private verificarSePerfilExiste(perfil: Perfil | null, id: number) {
    if (!perfil) {
      throw new Error(`Perfil com id ${id} não encontrado.`);
    }
    return perfil;
  }
}
