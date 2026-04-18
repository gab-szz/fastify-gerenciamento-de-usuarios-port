import { describe, expect, test } from 'vitest';
import { PermissaoMapper } from './permissao.mapper.js';
import { Permissao } from './permissao.domain.js';
import { PermissaoEntity } from '../infra/permissao.entity.js';

describe('PermissaoMapper', () => {
  describe('domainParaEntity', () => {
    test('Deve converter uma Permissao do domínio para PermissaoEntity', () => {
      // ARRANGE
      const criadoEm = new Date('2026-01-01');
      const atualizadoEm = new Date('2026-01-10');
      const permissao = Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        descricao: 'Permite criar usuários',
        criadoEm,
        atualizadoEm,
      });

      // ACT
      const entity = PermissaoMapper.domainParaEntity(permissao);

      // ASSERT
      expect(entity).toBeInstanceOf(PermissaoEntity);
      expect(entity.id).toBe(1);
      expect(entity.nome).toBe('CRIAR_USUARIO');
      expect(entity.descricao).toBe('Permite criar usuários');
      expect(entity.criadoEm).toBe(criadoEm);
      expect(entity.atualizadoEm).toBe(atualizadoEm);
    });

    test('Deve converter sem descrição', () => {
      // ARRANGE
      const permissao = Permissao.hidratar({
        id: 2,
        nome: 'EDITAR_USUARIO',
        criadoEm: new Date(),
      });

      // ACT
      const entity = PermissaoMapper.domainParaEntity(permissao);

      // ASSERT
      expect(entity.id).toBe(2);
      expect(entity.nome).toBe('EDITAR_USUARIO');
    });
  });

  describe('entityParaDomain', () => {
    test('Deve converter uma PermissaoEntity para Permissao do domínio', () => {
      // ARRANGE
      const entity = new PermissaoEntity();
      entity.id = 1;
      entity.nome = 'CRIAR_USUARIO';
      entity.descricao = 'Permite criar usuários';
      entity.criadoEm = new Date('2026-01-01');
      entity.atualizadoEm = new Date('2026-01-10');

      // ACT
      const permissao = PermissaoMapper.entityParaDomain(entity);

      // ASSERT
      expect(permissao).toBeInstanceOf(Permissao);
      expect(permissao.id).toBe(1);
      expect(permissao.nome).toBe('CRIAR_USUARIO');
      expect(permissao.descricao).toBe('Permite criar usuários');
      expect(permissao.criadoEm).toBeInstanceOf(Date);
    });

    test('Deve converter sem campos opcionais', () => {
      // ARRANGE
      const entity = new PermissaoEntity();
      entity.id = 2;
      entity.nome = 'EDITAR_USUARIO';
      entity.criadoEm = new Date();

      // ACT
      const permissao = PermissaoMapper.entityParaDomain(entity);

      // ASSERT
      expect(permissao).toBeInstanceOf(Permissao);
      expect(permissao.id).toBe(2);
    });
  });
});
