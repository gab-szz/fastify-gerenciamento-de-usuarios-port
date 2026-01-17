import type { setorType } from "./setor.type.js";

export class Setor {
  readonly id?: number;
  private nome!: string;
  private criado_em?: Date;
  private alterado_em?: Date;
  private excluido_em?: Date;

  private constructor(input: setorType) {
    Object.assign(this, input);
  }

  static criar(input: setorType) {
    if (input.id) {
      throw new Error("Erro ao criar setor: ID não deve ser fornecido.");
    }
    return new Setor(input);
  }

  static hidratar(input: setorType) {
    if (!input.id) {
      throw new Error("Erro ao hidratar setor: ID deve ser fornecido.");
    }
    return new Setor(input);
  }
}
