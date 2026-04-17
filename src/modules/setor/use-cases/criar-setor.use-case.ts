import { Service, Inject } from 'fastify-decorators';
import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import { Setor } from '../domain/setor.domain.js';
import type { criarSetorDTO } from '../dtos/criar-setor.dto.js';
import type { ISetorRepository } from '../infra/setor.repository.interface.js';
import { SetorRepository } from '../infra/setor.repository.js';

@Service()
export class CriarSetorUseCase {
  @Inject(SetorRepository)
  private readonly repository!: ISetorRepository;

  constructor(repository?: ISetorRepository) {
    if (repository) this.repository = repository;
  }

  async executar(input: criarSetorDTO) {
    await this._validarSeSetorExiste(input.nome);

    let setor = Setor.criar(input);
    setor = await this.repository.inserir(setor);
    return setor;
  }

  private async _validarSeSetorExiste(nome: string) {
    if (await this.repository.consultarPorNome(nome)) {
      throw new ErroRegraNegocio('Already exists');
    }
  }
}
