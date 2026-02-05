import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import { Setor } from '../domain/setor.domain.js';
import type { ISetorRepository } from '../infra/setor.repository.js';

export class ExcluirSetorUseCase {
  constructor(private readonly repository: ISetorRepository) {
    this.repository = repository;
  }

  async executar(id: number) {
    const setor = await this._consultarSetor(id);

    setor.excluir();
    return await this.repository.atualizar(setor);
  }

  private async _consultarSetor(id: number): Promise<Setor> {
    const setor = await this.repository.consultarPorId(id);
    if (!setor) {
      throw new ErroRegraNegocio('Not exists');
    }
    return setor;
  }
}
