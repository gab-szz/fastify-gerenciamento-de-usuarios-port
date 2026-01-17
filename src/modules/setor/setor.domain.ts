import type { setorType } from "./setor.type.js";

export class Setor {
  readonly id?: number;
  private _nome!: string;
  private _criado_em?: Date | undefined;
  private _alterado_em?: Date | undefined;
  private _excluido_em?: Date | undefined;

  get nome(): string {
    return this._nome;
  }
  get criado_em(): Date | undefined {
    return this._criado_em;
  }
  get alterado_em(): Date | undefined {
    return this._alterado_em;
  }
  get excluido_em(): Date | undefined {
    return this._excluido_em;
  }

  private constructor(input: setorType) {
    this._nome = input.nome;
    this._alterado_em = input.alterado_em;
    this._excluido_em = input.excluido_em;
    if (input.id) {
      this.id = input.id;
      this._criado_em = input.criado_em;
    } else {
      this._criado_em = new Date();
    }
  }

  static criar(input: setorType): Setor {
    if (input.id) {
      throw new Error("Erro ao criar setor: ID não deve ser fornecido.");
    }
    if (!input.nome) {
      throw new Error("Erro ao criar setor: nome deve ser fornecido.");
    }

    return new Setor(input);
  }

  static hidratar(input: setorType): Setor {
    if (!input.id) {
      throw new Error("Erro ao hidratar setor: ID deve ser fornecido.");
    }
    return new Setor(input);
  }

  atualizar(input: Partial<setorType>) {
    if (!input.nome) {
      throw new Error("Erro ao atualizar setor: nome deve ser fornecido.");
    }
    this._nome = input.nome;
    this._alterado_em = new Date();
    return this;
  }

  excluir() {
    if (this._excluido_em) {
      throw new Error("Erro ao remove setor: o mesmo já se encontra excluído.");
    }
    this._excluido_em = new Date();
    return this;
  }

  reativar() {
    if (!this._excluido_em) {
      throw new Error("Erro ao reativar setor: o mesmo já se encontra ativo.");
    }
    this._excluido_em = undefined;
    return this;
  }
}
