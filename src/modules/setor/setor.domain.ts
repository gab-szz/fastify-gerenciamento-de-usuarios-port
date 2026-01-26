import type { setorType } from './setor.type.js';

export class Setor {
  readonly id?: number;
  private _nome!: string;
  private _criadoEm?: Date | undefined;
  private _alteradoEm?: Date | undefined;
  private _excluidoEm?: Date | undefined;

  get nome(): string {
    return this._nome;
  }
  get criadoEm(): Date | undefined {
    return this._criadoEm;
  }
  get alteradoEm(): Date | undefined {
    return this._alteradoEm;
  }
  get excluidoEm(): Date | undefined {
    return this._excluidoEm;
  }

  private constructor(input: setorType) {
    this._nome = input.nome;
    this._alteradoEm = input.alteradoEm;
    this._excluidoEm = input.excluidoEm;
    this._criadoEm = input.criadoEm;
    if (input.id) {
      this.id = input.id;
    }
  }

  static criar(input: setorType): Setor {
    if (input.id) {
      throw new Error(
        'Erro ao criar setor: ID não deve ser fornecido.',
      );
    }
    if (!input.nome) {
      throw new Error(
        'Erro ao criar setor: nome deve ser fornecido.',
      );
    }

    return new Setor(input);
  }

  static hidratar(input: setorType): Setor {
    if (!input.id) {
      throw new Error(
        'Erro ao hidratar setor: ID deve ser fornecido.',
      );
    }
    return new Setor(input);
  }

  atualizar(input: Partial<setorType>) {
    if (!input.nome) {
      throw new Error(
        'Erro ao atualizar setor: nome deve ser fornecido.',
      );
    }
    this._nome = input.nome;
    this._alteradoEm = new Date();
    return this;
  }

  excluir() {
    if (this._excluidoEm) {
      throw new Error(
        'Erro ao remove setor: o mesmo já se encontra excluído.',
      );
    }
    this._excluidoEm = new Date();
    return this;
  }

  reativar() {
    if (!this._excluidoEm) {
      throw new Error(
        'Erro ao reativar setor: o mesmo já se encontra ativo.',
      );
    }
    this._excluidoEm = undefined;
    return this;
  }
}
