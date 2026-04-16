import type { atualizarPermissaoDTO } from '../dtos/atualizar-permissao.dto.js';
import type { criarPermissaoDTO } from '../dtos/criar-permissao.dto.js';
import type { PermissaoType } from '../permissao.type.js';

export class Permissao {
  readonly id?: number;
  _nome!: string;
  _descricao?: string;
  _criadoEm?: Date;
  _atualizadoEm?: Date;

  get nome() {
    return this._nome;
  }
  get descricao() {
    return this._descricao;
  }
  get criadoEm() {
    return this._criadoEm;
  }
  get atualizadoEm() {
    return this._atualizadoEm;
  }

  private constructor(input: PermissaoType) {
    this._nome = input.nome;
    this._descricao = input.descricao || '';
    this._criadoEm = input.criadoEm || new Date();
    this._atualizadoEm = input.atualizadoEm;
    if (input.id) {
      this.id = input.id;
    }
  }

  static criar(input: criarPermissaoDTO) {
    return new Permissao({
      nome: input.nome,
      descricao: input.descricao,
      criadoEm: new Date(),
    });
  }

  static hidratar(input: PermissaoType) {
    if (!input.id) {
      throw new Error('Erro ao hidratar permissão: ID não foi fornecido.');
    }
    if (input.nome.length < 4) {
      throw new Error('Nome da permissão deve possuir ao menos 4 caracteres');
    }
    return new Permissao(input);
  }

  async atualizar(input: atualizarPermissaoDTO) {
    if (input.nome.length < 4) {
      throw new Error('Nome da permissão deve possuir ao menos 4 caracteres');
    }
    this._nome = input.nome;
    this._descricao = input.descricao || this._descricao;
    this._atualizadoEm = new Date();
  }
}
