import { Setor } from '../domain/setor.domain.js';
import type { ISetorRepository } from '../infra/setor.repository.js';
import type { criarSetorDTO } from '../setor.type.js';

export class CriarSetorUseCase {
  constructor(private readonly repository: ISetorRepository) {
    this.repository = repository;
  }

  async executar(input: criarSetorDTO) {
    this._validarSeSetorExiste(input.nome);

    let setor = Setor.criar(input);
    setor = await this.repository.inserir(setor);
    return setor;
  }

  private async _validarSeSetorExiste(nome: string) {
    const resultado = await this.repository.consultarPorNome(nome);
    if (resultado) {
      throw new Error('Já existe um Setor cadastrado com esse nome');
    }
  }
}
