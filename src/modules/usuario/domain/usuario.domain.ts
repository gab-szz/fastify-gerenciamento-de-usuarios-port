import type { atualizarUsuarioDTO } from '../dtos/atualizar-usuario.dto.js';
import type { criarUsuarioDTO } from '../dtos/criar-usuario.dto.js';
import type { UsuarioType } from '../types.js';

export class Usuario {
  readonly id?: number;
  private _nome!: string;
  private _dataNascimento?: Date;
  private _login!: string;
  private _senha!: string;
  private _perfilId?: number;
  private _setorId?: number;
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

  private constructor(input: UsuarioType) {
    this._nome = input.nome;
    this._dataNascimento = input.dataNascimento;
    this._login = input.login;
    this._senha = input.senha;
    this._perfilId = input.perfilId;
    this._setorId = input.setorId;
    this._enderecosId = input.enderecosId;
    this._ativo = input.ativo;
    this._dataCriacao = input.dataCriacao;
    this._dataAtualizacao = input.dataAtualizacao;
    this._dataExclusao = input.dataExclusao;
    if (input.id) {
      this.id = input.id;
    }
  }

  static criar(input: criarUsuarioDTO): Usuario {
    Usuario._validarCamposObrigatorios(input);
    Usuario._validarEmailEhValido(input.login);
    Usuario._validarSenhaEhForte(input.senha);
    Usuario._validarNomeEhValido(input.nome);
    if (input.dataNascimento)
      Usuario._validarDataNascimentoEhValida(input.dataNascimento);
    return new Usuario({
      nome: input.nome,
      dataNascimento: input.dataNascimento,
      login: input.login,
      senha: input.senha,
      perfilId: input.perfilId,
      setorId: input.setorId,
      enderecosId: input.enderecosId,
      ativo: true,
      dataCriacao: new Date(),
    });
  }

  static hidratar(input: UsuarioType) {
    return new Usuario(input);
  }

  atualizar(input: atualizarUsuarioDTO): Usuario {
    Usuario._validarNomeEhValido(input.nome);
    Usuario._validarEmailEhValido(input.login);
    if (input.dataNascimento)
      Usuario._validarDataNascimentoEhValida(input.dataNascimento);
    return new Usuario({
      id: this.id,
      nome: input.nome,
      dataNascimento: input.dataNascimento ?? this._dataNascimento,
      login: input.login,
      senha: this._senha,
      perfilId: input.perfilId,
      setorId: input.setorId,
      enderecosId: input.enderecosId ?? this._enderecosId,
      ativo: this._ativo,
      dataCriacao: this._dataCriacao,
      dataAtualizacao: new Date(),
    });
  }

  excluir(): Usuario {
    return new Usuario({
      id: this.id,
      nome: this._nome,
      dataNascimento: this._dataNascimento,
      login: this._login,
      senha: this._senha,
      perfilId: this._perfilId,
      setorId: this._setorId,
      enderecosId: this._enderecosId,
      ativo: false,
      dataCriacao: this._dataCriacao,
      dataAtualizacao: this._dataAtualizacao,
      dataExclusao: new Date(),
    });
  }

  private static _validarEmailEhValido(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
  }

  private static _validarSenhaEhForte(senha: string) {
    const senhaRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(senha)) {
      throw new Error(
        'Senha fraca. A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
      );
    }
  }

  private static _validarNomeEhValido(nome: string) {
    if (nome.length < 4) {
      throw new Error('O nome deve conter pelo menos 4 caracteres');
    }
  }

  private static _validarDataNascimentoEhValida(dataNascimento: Date) {
    const hoje = new Date();
    if (dataNascimento >= hoje) {
      throw new Error('Data de nascimento inválida');
    }
  }

  private static _validarCamposObrigatorios(input: criarUsuarioDTO) {
    if (
      !input.nome ||
      !input.login ||
      !input.senha ||
      !input.perfilId ||
      !input.setorId
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }
  }
}
