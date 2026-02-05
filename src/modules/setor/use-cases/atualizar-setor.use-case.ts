import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import { Setor } from '../domain/setor.domain.js';
import type { ISetorRepository } from '../infra/setor.repository.js';
import type { atualizarSetorDTO, criarSetorDTO } from '../setor.type.js';

export class AtualizarSetorUseCase {
  constructor(private readonly repository: ISetorRepository) {
    this.repository = repository;
  }

  async executar(input: atualizarSetorDTO) {
    const setor = await this._consultarSetor(input.id);

    setor.atualizar(input);
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
