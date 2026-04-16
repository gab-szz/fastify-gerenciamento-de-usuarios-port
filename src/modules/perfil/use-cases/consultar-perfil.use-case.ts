import type { Perfil } from '../domain/perfil.domain.js';
import type { IPerfilRepository } from '../infra/perfil.repository.js';

export class ConsultarPerfilUseCase {
  constructor(private readonly rep: IPerfilRepository) {}

  async porId(id: number) {
    return await this.rep.consultarPorId(id);
  }

  async porNome(nome: string) {
    return await this.rep.consultarPorNome(nome);
  }

  async todos(): Promise<Perfil[]> {
    return await this.rep.consultarTodos();
  }
}
