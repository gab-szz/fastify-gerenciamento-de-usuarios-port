import { beforeEach, describe, expect, test } from 'vitest';
import { Permissao } from './permissao.domain.js';

describe('Permissao', () => {
  describe('.criar', () => {
    test('Deve criar uma permissão com sucesso', () => {
      const permissao = Permissao.criar({ nome: 'CRIAR_USUARIO' });
      expect(permissao).toBeInstanceOf(Permissao);
      expect(permissao.nome).toBe('CRIAR_USUARIO');
    });

    test('Deve criar uma permissão com descrição', () => {
      const permissao = Permissao.criar({
        nome: 'CRIAR_USUARIO',
        descricao: 'Permite criar usuários no sistema',
      });
      expect(permissao.descricao).toBe('Permite criar usuários no sistema');
    });

    test('Deve criar uma permissão sem ID', () => {
      const permissao = Permissao.criar({ nome: 'CRIAR_USUARIO' });
      expect(permissao.id).toBeUndefined();
    });
  });

  describe('.hidratar', () => {
    test('Deve hidratar uma permissão com sucesso', () => {
      const permissao = Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
      });
      expect(permissao).toBeInstanceOf(Permissao);
      expect(permissao.id).toBe(1);
      expect(permissao.nome).toBe('CRIAR_USUARIO');
    });

    test('Deve lançar erro ao hidratar sem ID', () => {
      expect(() =>
        Permissao.hidratar({ nome: 'CRIAR_USUARIO' } as any),
      ).toThrow('Erro ao hidratar permissão: ID não foi fornecido.');
    });

    test('Deve lançar erro ao hidratar com nome menor que 4 caracteres', () => {
      expect(() => Permissao.hidratar({ id: 1, nome: 'abc' })).toThrow(
        'Nome da permissão deve possuir ao menos 4 caracteres',
      );
    });
  });

  describe('getters', () => {
    let permissao: Permissao;

    beforeEach(() => {
      permissao = Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        descricao: 'Descrição da permissão',
        criadoEm: new Date('2026-01-01'),
        atualizadoEm: new Date('2026-01-10'),
      });
    });

    test('Deve retornar o nome', () => {
      expect(permissao.nome).toBe('CRIAR_USUARIO');
    });

    test('Deve retornar a descrição', () => {
      expect(permissao.descricao).toBe('Descrição da permissão');
    });

    test('Deve retornar a data de criação', () => {
      expect(permissao.criadoEm).toBeInstanceOf(Date);
    });

    test('Deve retornar a data de atualização', () => {
      expect(permissao.atualizadoEm).toBeInstanceOf(Date);
    });
  });

  describe('.atualizar', () => {
    test('Deve atualizar o nome da permissão', () => {
      const permissao = Permissao.hidratar({ id: 1, nome: 'CRIAR_USUARIO' });
      permissao.atualizar({ id: 1, nome: 'EDITAR_USUARIO' });
      expect(permissao.nome).toBe('EDITAR_USUARIO');
    });

    test('Deve atualizar a descrição da permissão', () => {
      const permissao = Permissao.hidratar({ id: 1, nome: 'CRIAR_USUARIO' });
      permissao.atualizar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        descricao: 'Nova descrição',
      });
      expect(permissao.descricao).toBe('Nova descrição');
    });

    test('Deve atualizar a data de atualização', () => {
      const permissao = Permissao.hidratar({ id: 1, nome: 'CRIAR_USUARIO' });
      permissao.atualizar({ id: 1, nome: 'EDITAR_USUARIO' });
      expect(permissao.atualizadoEm).toBeInstanceOf(Date);
    });

    test('Deve lançar erro ao atualizar com nome menor que 4 caracteres', () => {
      const permissao = Permissao.hidratar({ id: 1, nome: 'CRIAR_USUARIO' });
      expect(() => permissao.atualizar({ id: 1, nome: 'abc' })).toThrow(
        'Nome da permissão deve possuir ao menos 4 caracteres',
      );
    });
  });
});
