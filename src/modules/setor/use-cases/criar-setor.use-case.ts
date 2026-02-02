import { ErroRegraNegocio } from '../../../errors/ErroRegraNegocio.error.js';
import { Setor } from '../domain/setor.domain.js';
import type { ISetorRepository } from '../infra/setor.repository.js';
import { SetorValidator } from '../services/setor.validador.js';
import type { criarSetorDTO } from '../setor.type.js';

export class CriarSetorUseCase {
  validador: SetorValidator;
  constructor(private readonly repository: ISetorRepository) {
    this.validador = new SetorValidator(repository);
    this.repository = repository;
  }

  async executar(input: criarSetorDTO) {
    await this._validarSeSetorExiste(input.nome);

    let setor = Setor.criar(input);
    setor = await this.repository.inserir(setor);
    return setor;
  }

  private async _validarSeSetorExiste(nome: string) {
    if (await this.validador.validarSeSetorExiste(nome)) {
      throw new ErroRegraNegocio('Already exists');
    }
  }
}
