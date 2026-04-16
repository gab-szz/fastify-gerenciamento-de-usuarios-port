import { Service, Inject } from 'fastify-decorators';
import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import { Setor } from '../domain/setor.domain.js';
import type { ISetorRepository } from '../infra/setor.repository.interface.js';
import { SetorRepository } from '../infra/setor.repository.js';

@Service()
export class ExcluirSetorUseCase {
  @Inject(SetorRepository)
  private readonly repository!: ISetorRepository;

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
