import { describe, expect, test } from 'vitest';
import { Endereco } from './endereco.domain.js';

const enderecoBase = {
  id: 1,
  rua: 'Rua A',
  numero: '123',
  bairro: 'Centro',
  cidade: 'São Paulo',
  estado: 'SP',
  cep: '01000-000',
};

describe('Endereco.criar', () => {
  test('Deve lançar erro quando rua não for fornecida', () => {
    expect(() => Endereco.criar({ ...enderecoBase, rua: '' })).toThrow(
      'Validação de endereço: rua deve ser fornecida.',
    );
  });

  test('Deve lançar erro quando bairro não for fornecido', () => {
    expect(() => Endereco.criar({ ...enderecoBase, bairro: '' })).toThrow(
      'Validação de endereço: bairro deve ser fornecido.',
    );
  });

  test('Deve lançar erro quando cidade não for fornecida', () => {
    expect(() => Endereco.criar({ ...enderecoBase, cidade: '' })).toThrow(
      'Validação de endereço: cidade deve ser fornecida.',
    );
  });

  test('Deve lançar erro quando estado não for fornecido', () => {
    expect(() => Endereco.criar({ ...enderecoBase, estado: '' })).toThrow(
      'Validação de endereço: estado deve ser fornecido.',
    );
  });

  test('Deve lançar erro quando cep não for fornecido', () => {
    expect(() => Endereco.criar({ ...enderecoBase, cep: '' })).toThrow(
      'Validação de endereço: cep deve ser fornecido.',
    );
  });
});

describe('Endereco.hidratar', () => {
  test('Deve lançar erro quando ID não for fornecido', () => {
    expect(() => Endereco.hidratar({ ...enderecoBase, id: undefined })).toThrow(
      'Erro ao realizar operação em endereço: ID deve ser fornecido.',
    );
  });
});

describe('Endereco.excluir', () => {
  test('Deve excluir um endereço com sucesso', () => {
    const endereco = Endereco.hidratar(enderecoBase);
    const resultado = endereco.excluir();
    expect(resultado.excluidoEm).toBeInstanceOf(Date);
  });

  test('Deve lançar erro ao excluir um endereço já excluído', () => {
    const endereco = Endereco.hidratar({
      ...enderecoBase,
      excluidoEm: new Date(),
    });
    expect(() => endereco.excluir()).toThrow(
      'Erro ao excluir endereço: endereço já está excluído.',
    );
  });
});

describe('Endereco.reativar', () => {
  test('Deve reativar um endereço excluído com sucesso', () => {
    const endereco = Endereco.hidratar({
      ...enderecoBase,
      excluidoEm: new Date(),
    });
    const resultado = endereco.reativar();
    expect(resultado.excluidoEm).toBeUndefined();
  });

  test('Deve lançar erro ao reativar um endereço não excluído', () => {
    const endereco = Endereco.hidratar(enderecoBase);
    expect(() => endereco.reativar()).toThrow(
      'Erro ao reativar endereço: endereço não está excluído.',
    );
  });
});

describe('Endereco.toJSON', () => {
  test('Deve serializar corretamente o endereço', () => {
    const criadoEm = new Date(2026, 0, 15);
    const endereco = Endereco.hidratar({ ...enderecoBase, criadoEm });
    const json = endereco.toJSON();
    expect(json).toEqual({
      id: 1,
      rua: 'Rua A',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01000-000',
      complemento: undefined,
      criadoEm,
      alteradoEm: undefined,
      excluidoEm: undefined,
    });
  });
});
