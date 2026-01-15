export class Setor {
  readonly id?: number;
  private nome: string;

  private constructor(
    nome: string,
    id?: number,
    criado_em?: Date,
    alterado_em?: Date,
    excluido_em?: Date
  ) {
    this.nome = nome;
    if (id) {
      this.id = id;
    }
  }

  criar(
    nome: string,
    id?: number,
    criado_em?: Date,
    alterado_em?: Date,
    excluido_em?: Date
  ) {}
}
