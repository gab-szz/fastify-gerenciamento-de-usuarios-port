import { Service, Inject } from 'fastify-decorators';
import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import { Setor } from '../domain/setor.domain.js';
import type { atualizarSetorDTO } from '../dtos/atualizar-setor.dto.js';
import type { ISetorRepository } from '../infra/setor.repository.interface.js';
import { SetorRepository } from '../infra/setor.repository.js';

@Service()
export class AtualizarSetorUseCase {
  @Inject(SetorRepository)
  private readonly repository!: ISetorRepository;

  constructor(repository?: ISetorRepository) {
    if (repository) this.repository = repository;
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
