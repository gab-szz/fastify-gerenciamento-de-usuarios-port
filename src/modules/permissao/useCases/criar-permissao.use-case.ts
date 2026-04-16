import { Inject } from 'fastify-decorators';
import { Permissao } from '../domain/permissao.domain.js';
import type { criarPermissaoDTO } from '../dtos/criar-permissao.dto.js';
import { PermissaoRepository } from '../infra/permissao.repository.js';
import type { IPermissaoRepository } from '../infra/permissao.repository.interface.js';

export class CriarPermissaoUseCase {
  @Inject(PermissaoRepository)
  private readonly rep!: IPermissaoRepository;

  async exec(input: criarPermissaoDTO) {
    input.nome = input.nome.toUpperCase();
    await this.verificarSeNomeJaExiste(input.nome);

    const permissao = Permissao.criar(input);
    return this.rep.salvar(permissao);
  }

  private async verificarSeNomeJaExiste(nome: string) {
    const permissao = await this.rep.consultarPorNome(nome);
    if (permissao) {
      throw new Error(`Já existe uma permissão cadastrada com o nome: ${nome}`);
    }
  }
}
