import { Inject } from 'fastify-decorators';
import { PermissaoRepository } from '../infra/permissao.repository.js';
import type { IPermissaoRepository } from '../infra/permissao.repository.interface.js';
import type { atualizarPermissaoDTO } from '../dtos/atualizar-permissao.dto.js';

export class AtualizarPermissaoUseCase {
  @Inject(PermissaoRepository)
  private readonly rep!: IPermissaoRepository;

  async exec(input: atualizarPermissaoDTO) {
    input.nome = input.nome.toUpperCase();
    const permissao = await this.obterPermissaoPeloNome(input.nome);

    permissao.atualizar(input);
    return this.rep.salvar(permissao);
  }

  async obterPermissaoPeloNome(nome: string) {
    const permissao = await this.rep.consultarPorNome(nome);
    if (!permissao) {
      throw new Error(`Não encontramos um permissao com o nome ${nome}`);
    }
    return permissao;
  }
}
