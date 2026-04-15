import { describe, expect, test } from 'vitest';
import { EnderecoMapper } from './endereco.mapper.js';
import { Endereco } from './endereco.domain.js';

describe('EnderecoMapper', () => {
  describe('constructor', () => {
    test('Deve criar uma instância de EnderecoMapper', () => {
      const mapper = new EnderecoMapper();
      expect(mapper).toBeInstanceOf(EnderecoMapper);
    });
  });

  describe('domainParaEntity', () => {
    test('Deve converter um Endereco do domínio para EnderecoEntity', () => {
      const criadoEm = new Date(2026, 0, 15);
      const alteradoEm = new Date(2026, 0, 20);
      const endereco = Endereco.hidratar({
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
        criadoEm,
        alteradoEm,
      });

      const resultado = EnderecoMapper.domainParaEntity(endereco);

      expect(resultado).toEqual({
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
        criadoEm,
        alteradoEm,
        excluidoEm: undefined,
      });
    });
  });

  describe('entityParaDomain', () => {
    test('Deve converter uma EnderecoEntity para Endereco do domínio', () => {
      const criadoEm = new Date(2026, 0, 15);
      const entity = {
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
        criadoEm,
        alteradoEm: undefined,
        excluidoEm: undefined,
      } as any;

      const resultado = EnderecoMapper.entityParaDomain(entity);

      expect(resultado).toBeInstanceOf(Endereco);
      expect(resultado.id).toBe(1);
      expect(resultado.rua).toBe('Rua A');
      expect(resultado.criadoEm).toEqual(criadoEm);
    });
  });
});
