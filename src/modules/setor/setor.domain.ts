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
    return new Setor(input);
  }

  static hidratar(input: setorType) {
    if (input.id) {
      throw new Error("");
    }
    return new Setor(input);
  }
}
