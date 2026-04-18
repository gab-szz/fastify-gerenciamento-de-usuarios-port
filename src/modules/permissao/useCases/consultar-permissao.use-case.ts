import { Service, Inject } from 'fastify-decorators';
import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import { PermissaoRepository } from '../infra/permissao.repository.js';
import type { IPermissaoRepository } from '../infra/permissao.repository.interface.js';

@Service()
export class ConsultarPermissaoUseCase {
  @Inject(PermissaoRepository)
  private readonly rep!: IPermissaoRepository;

  constructor(rep?: IPermissaoRepository) {
    if (rep) this.rep = rep;
  }

  async porId(id: number) {
    if (!id || id < 0) {
      throw new ErroRegraNegocio('Um ID válido deve ser fornecido.');
    }
    return await this.rep.consultarPorId(id);
  }

  async porNome(nome: string) {
    if (!nome || nome.length === 0) {
      throw new ErroRegraNegocio('Um nome válido deve ser fornecido.');
    }
    return await this.rep.consultarPorNome(nome);
  }

  async todas() {
    return await this.rep.consultarTodas();
  }
}
