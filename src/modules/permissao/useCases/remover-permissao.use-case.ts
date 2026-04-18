import { Service, Inject } from 'fastify-decorators';
import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import { PermissaoRepository } from '../infra/permissao.repository.js';
import type { IPermissaoRepository } from '../infra/permissao.repository.interface.js';

@Service()
export class RemoverPermissaoUseCase {
  @Inject(PermissaoRepository)
  private readonly rep!: IPermissaoRepository;

  constructor(rep?: IPermissaoRepository) {
    if (rep) this.rep = rep;
  }

  async exec(id: number) {
    const permissao = await this.rep.consultarPorId(id);
    if (!permissao) {
      throw new ErroRegraNegocio(
        `Não foi encontrada uma permissão com id ${id}`,
      );
    }
    return this.rep.remover(id);
  }
}
