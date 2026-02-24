import type { enderecoType } from '../endereco.type.js';

export class Endereco {
  readonly id?: number;
  private _rua!: string;
  private _cidade!: string;
  private _estado!: string;
  private _cep!: string;
  private _criadoEm?: Date | undefined;
  private _alteradoEm?: Date | undefined;
  private _excluidoEm?: Date | undefined;

  get rua(): string {
    return this._rua;
  }
  get cidade(): string {
    return this._cidade;
  }
  get estado(): string {
    return this._estado;
  }
  get cep(): string {
    return this._cep;
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

  private constructor(input: enderecoType) {
    this._rua = input.rua;
    this._cidade = input.cidade;
    this._estado = input.estado;
    this._cep = input.cep;
    this._alteradoEm = input.alteradoEm;
    this._excluidoEm = input.excluidoEm;
    this._criadoEm = input.criadoEm;
    if (input.id) {
      this.id = input.id;
    }
  }

  static criar(input: enderecoType): Endereco {
    this.validarCamposObrigatorios(input);

    return new Endereco(input);
  }

  static hidratar(input: enderecoType): Endereco {
    this.validarCamposObrigatorios(input, true);
    return new Endereco(input);
  }

  atualizar(input: Partial<enderecoType>): Endereco {
    Endereco.validarCamposObrigatorios(input as enderecoType, true);
    return new Endereco(input as enderecoType);
  }

  excluir(): Endereco {
    if (this._excluidoEm) {
      throw new Error('Erro ao excluir endereço: endereço já está excluído.');
    }
    this._excluidoEm = new Date();
    return this;
  }

  reativar(): Endereco {
    if (!this._excluidoEm) {
      throw new Error('Erro ao reativar endereço: endereço não está excluído.');
    }
    this._excluidoEm = undefined;
    return this;
  }

  private static validarCamposObrigatorios(
    input: enderecoType,
    validarId = false,
  ) {
    if (validarId && !input.id) {
      throw new Error(
        'Erro ao realizar operação em endereço: ID deve ser fornecido.',
      );
    }
    if (!input.rua) {
      throw new Error('Erro ao criar endereço: rua deve ser fornecida.');
    }
    if (!input.cidade) {
      throw new Error('Erro ao criar endereço: cidade deve ser fornecida.');
    }
    if (!input.estado) {
      throw new Error('Erro ao criar endereço: estado deve ser fornecido.');
    }
    if (!input.cep) {
      throw new Error('Erro ao criar endereço: cep deve ser fornecido.');
    }
  }
}
