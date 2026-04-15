import { beforeEach, describe, expect, it } from 'vitest';
import { Perfil } from './perfil.domain.js';

describe('Perfil', () => {
  let perfil: Perfil;
  let nome: string;

  beforeEach(() => {
    nome = 'T.I.';
    perfil = Perfil.criar({ nome: nome });
  });

  describe('.criar', () => {
    it('Deve criar um perfil com sucesso', () => {
      expect(perfil).toBeInstanceOf(Perfil);
      expect(perfil.nome).toBe(nome);
    });

    it('Deve lançar um erro se o nome tiver menos de 4 caracteres', () => {
      expect(() => Perfil.criar({ nome: nome.slice(0, 3) })).toThrowError(
        'Nome do perfil deve possuir ao menos 4 caracteres',
      );
    });
  });

  describe('.hidratar', () => {
    it('Deve hidratar um perfil com sucesso', () => {
      const input = { id: 1, nome: nome, criadoEm: new Date() };
      const perfilHidratado = Perfil.hidratar(input);
      expect(perfilHidratado).toBeInstanceOf(Perfil);
      expect(perfilHidratado.id).toBe(1);
      expect(perfilHidratado.nome).toBe(nome);
      expect(perfilHidratado.criadoEm).toBeInstanceOf(Date);
    });

    it('Deve lançar um erro se o ID não for fornecido', () => {
      const input = { nome: nome, criadoEm: new Date() } as any;
      expect(() => Perfil.hidratar(input)).toThrowError(
        'Erro ao hidratar perfil: ID não foi fornecido.',
      );
    });

    it('Deve lançar um erro se o nome tiver menos de 4 caracteres', () => {
      const input = { id: 1, nome: nome.slice(0, 3), criadoEm: new Date() };
      expect(() => Perfil.hidratar(input)).toThrowError(
        'Nome do perfil deve possuir ao menos 4 caracteres',
      );
    });
  });

  describe('.atualizar', () => {
    it('Deve atualizar o nome do perfil com sucesso', () => {
      const novoNome = 'Desenvolvedor';
      perfil.atualizar(novoNome);
      expect(perfil.nome).toBe(novoNome);
      expect(perfil.alteradoEm).toBeInstanceOf(Date);
    });

    it('Deve lançar um erro se o novo nome tiver menos de 4 caracteres', () => {
      expect(() => perfil.atualizar('abc')).toThrowError(
        'Nome do perfil deve possuir ao menos 4 caracteres',
      );
    });
  });

  describe('.excluir', () => {
    it('Deve marcar o perfil como excluído', () => {
      perfil.excluir();
      expect(perfil.excluidoEm).toBeInstanceOf(Date);
    });

    it('Deve lançar um erro se o perfil já estiver excluído', () => {
      perfil.excluir();
      expect(() => perfil.excluir()).toThrowError('Perfil já excluído');
    });
  });
});
