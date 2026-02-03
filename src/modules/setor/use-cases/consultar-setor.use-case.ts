import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import type { SetorRepository } from '../infra/setor.repository.js';

export class ConsultarSetorUseCases {
  constructor(private readonly repository: SetorRepository) {}

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
