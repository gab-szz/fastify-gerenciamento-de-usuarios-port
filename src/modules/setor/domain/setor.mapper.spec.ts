import { beforeEach, describe, expect, test } from 'vitest';
import { SetorMapper } from './setor.mapper.js';
import { Setor } from './setor.domain.js';
import type { SetorEntity } from '../infra/setor.entity.js';

describe('SetorMapper', () => {
  describe('domainParaEntity', () => {
    test('Deve converter um Setor do domínio para SetorEntity', () => {
      // ARRANGE
      const criadoEm = new Date(2026, 0, 15);
      const alteradoEm = new Date(2026, 0, 20);
      const setor = Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
        criadoEm,
        alteradoEm,
      });

      // ACT
      const resultado = SetorMapper.domainParaEntity(setor);

      // ASSERT
      expect(resultado).toEqual({
        id: 1,
        nome: 'Tecnologia da Informação',
        criadoEm,
        alteradoEm,
        excluidoEm: undefined,
      });
    });

    test('Deve converter um Setor com excluidoEm preenchido', () => {
      // ARRANGE
      const criadoEm = new Date(2026, 0, 15);
      const excluidoEm = new Date(2026, 0, 25);
      const setor = Setor.hidratar({
        id: 2,
        nome: 'Financeiro',
        criadoEm,
        excluidoEm,
      });

      // ACT
      const resultado = SetorMapper.domainParaEntity(setor);

      // ASSERT
      expect(resultado).toEqual({
        id: 2,
        nome: 'Financeiro',
        criadoEm,
        alteradoEm: undefined,
        excluidoEm,
      });
    });

    test('Deve incluir todos os campos no mapeamento', () => {
      // ARRANGE
      const setor = Setor.hidratar({
        id: 3,
        nome: 'Recursos Humanos',
      });

      // ACT
      const resultado = SetorMapper.domainParaEntity(setor);

      // ASSERT
      expect(resultado).toHaveProperty('id');
      expect(resultado).toHaveProperty('nome');
      expect(resultado).toHaveProperty('criadoEm');
      expect(resultado).toHaveProperty('alteradoEm');
      expect(resultado).toHaveProperty('excluidoEm');
    });
  });

  describe('entityParaDomain', () => {
    test('Deve converter uma SetorEntity para um Setor do domínio', () => {
      // ARRANGE
      const criadoEm = new Date(2026, 0, 15);
      const alteradoEm = new Date(2026, 0, 20);
      const entity: SetorEntity = {
        id: 1,
        nome: 'Tecnologia da Informação',
        criadoEm,
        alteradoEm,
        excluidoEm: undefined,
      };

      // ACT
      const resultado = SetorMapper.entityParaDomain(entity);

      // ASSERT
      expect(resultado).toBeInstanceOf(Setor);
      expect(resultado.id).toBe(1);
      expect(resultado.nome).toBe('Tecnologia da Informação');
      expect(resultado.criadoEm).toEqual(criadoEm);
      expect(resultado.alteradoEm).toEqual(alteradoEm);
      expect(resultado.excluidoEm).toBeUndefined();
    });

    test('Deve converter uma SetorEntity com excluidoEm preenchido', () => {
      // ARRANGE
      const criadoEm = new Date(2026, 0, 15);
      const excluidoEm = new Date(2026, 0, 25);
      const entity: SetorEntity = {
        id: 2,
        nome: 'Financeiro',
        criadoEm,
        alteradoEm: undefined,
        excluidoEm,
      };

      // ACT
      const resultado = SetorMapper.entityParaDomain(entity);

      // ASSERT
      expect(resultado).toBeInstanceOf(Setor);
      expect(resultado.id).toBe(2);
      expect(resultado.nome).toBe('Financeiro');
      expect(resultado.excluidoEm).toEqual(excluidoEm);
    });

    test('Deve retornar uma instância válida de Setor', () => {
      // ARRANGE
      const entity: SetorEntity = {
        id: 3,
        nome: 'Recursos Humanos',
        criadoEm: new Date(),
        alteradoEm: undefined,
        excluidoEm: undefined,
      };

      // ACT
      const resultado = SetorMapper.entityParaDomain(entity);

      // ASSERT
      expect(resultado).toBeInstanceOf(Setor);
      expect(resultado.nome).toBe('Recursos Humanos');
    });
  });

  describe('Bidirecionalidade', () => {
    test('Deve ser possível converter domínio para entity e voltar', () => {
      // ARRANGE
      const setorOriginal = Setor.hidratar({
        id: 1,
        nome: 'TI',
        criadoEm: new Date(2026, 0, 15),
        alteradoEm: new Date(2026, 0, 20),
      });

      // ACT
      const entity = SetorMapper.domainParaEntity(setorOriginal);
      const setorRecuperado = SetorMapper.entityParaDomain(
        entity as SetorEntity,
      );

      // ASSERT
      expect(setorRecuperado.id).toBe(setorOriginal.id);
      expect(setorRecuperado.nome).toBe(setorOriginal.nome);
      expect(setorRecuperado.criadoEm).toEqual(
        setorOriginal.criadoEm,
      );
      expect(setorRecuperado.alteradoEm).toEqual(
        setorOriginal.alteradoEm,
      );
    });
  });
});
