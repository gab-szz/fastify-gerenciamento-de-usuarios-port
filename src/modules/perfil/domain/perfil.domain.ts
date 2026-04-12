import type { atualizarPerfilDTO } from '../dtos/atualizar-perfil.dto.js';
import type { criarPerfilDTO } from '../dtos/criar-perfil.dto.js';
import type { perfilType } from '../perfil.type.js';

export class Perfil {
  readonly id?: number;
  private _nome!: string;
  private _criadoEm?: Date;
  private _alteradoEm?: Date;
  private _excluidoEm?: Date;

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

  constructor(input: perfilType) {
    this._nome = input.nome;
    this._criadoEm = input.criadoEm;
    this._alteradoEm = input.alteradoEm;
    this._excluidoEm = input.excluidoEm;
    if (input.id) {
      this.id = input.id;
    }
  }

  static hidratar(input: perfilType) {
    if (!input.id) {
      throw new Error('Erro ao hidratar perfil: ID não foi fornecido.');
    }
    if (input.nome.length < 4) {
      throw new Error('Nome do perfil deve possuir ao menos 4 caracteres');
    }
    return new Perfil(input);
  }

  static criar(input: criarPerfilDTO) {
    if (input.nome.length < 4) {
      throw new Error('Nome do perfil deve possuir ao menos 4 caracteres');
    }
    return new Perfil(input);
  }

  atualizar(input: atualizarPerfilDTO) {
    if (input.nome.length < 4) {
      throw new Error('Nome do perfil deve possuir ao menos 4 caracteres');
    }
    this._nome = input.nome;
    this._alteradoEm = new Date();
  }

  excluir() {
    if (this._excluidoEm) {
      throw new Error('Perfil já excluído');
    }
    this._excluidoEm = new Date();
    return true;
  }
}
