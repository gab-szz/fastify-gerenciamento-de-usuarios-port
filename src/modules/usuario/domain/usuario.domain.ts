import type { UsuarioType } from '../types.js';

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

  get nome() {
    return this._nome;
  }
  get dataNascimento() {
    return this._dataNascimento;
  }
  get login() {
    return this._login;
  }
  get senha() {
    return this._senha;
  }
  get perfilId() {
    return this._perfilId;
  }
  get setorId() {
    return this._setorId;
  }
  get enderecosId() {
    return this._enderecosId;
  }
  get ativo() {
    return this._ativo;
  }
  get dataCriacao() {
    return this._dataCriacao;
  }
  get dataAtualizacao() {
    return this._dataAtualizacao;
  }
  get dataExclusao() {
    return this._dataExclusao;
  }

  private constructor(input: UsuarioType) {}

  static criar() {}

  static hidratar() {}

  atualizar() {}

  excluir() {}

  private _verificarSeEmailEhValido() {}
}
