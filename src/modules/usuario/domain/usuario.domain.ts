export class Usuario {
  readonly id?: number;
  private _nome!: string;
  private _dataNascimento?: Date;
  private _login!: string;
  private _senha!: string;
  private _perfilId!: number;
  private _setorId!: number;
  private _enderecosId?: number[];
  private _ativo!: boolean;
  private _dataCriacao!: Date;
  private _dataAtualizacao?: Date;
  private _dataExclusao?: Date;

  private constructor() {}

  static criar() {}

  static hidratar() {}

  atualizar() {}

  excluir() {}

  private _verificarSeEmailEhValido() {}
}
