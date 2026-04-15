import { describe, expect, test } from 'vitest';
import { PerfilMapper } from './perfil.mapper.js';
import { Perfil } from './perfil.domain.js';

describe('PerfilMapper', () => {
  describe('constructor', () => {
    test('Deve criar uma instância de PerfilMapper', () => {
      const mapper = new PerfilMapper();
      expect(mapper).toBeInstanceOf(PerfilMapper);
    });
  });

  describe('domainParaEntity', () => {
    test('Deve converter um Perfil do domínio para PerfilEntity', () => {
      const criadoEm = new Date(2026, 0, 15);
      const alteradoEm = new Date(2026, 0, 20);
      const perfil = Perfil.hidratar({
        id: 1,
        nome: 'T.I.',
        criadoEm,
        alteradoEm,
      });

      const resultado = PerfilMapper.domainParaEntity(perfil);

      expect(resultado).toEqual({
        id: 1,
        nome: 'T.I.',
        criadoEm,
        alteradoEm,
        excluidoEm: undefined,
      });
    });
  });

  describe('entityParaDomain', () => {
    test('Deve converter uma PerfilEntity para Perfil do domínio', () => {
      const criadoEm = new Date(2026, 0, 15);
      const entity = {
        id: 1,
        nome: 'T.I.',
        criadoEm,
        alteradoEm: undefined,
        excluidoEm: undefined,
      } as any;

      const resultado = PerfilMapper.entityParaDomain(entity);

      expect(resultado).toBeInstanceOf(Perfil);
      expect(resultado.id).toBe(1);
      expect(resultado.nome).toBe('T.I.');
      expect(resultado.criadoEm).toEqual(criadoEm);
    });
  });
});
