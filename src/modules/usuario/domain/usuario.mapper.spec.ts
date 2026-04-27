import { describe, expect, test } from 'vitest';
import { UsuarioMapper } from './usuario.mapper.js';
import { Usuario } from './usuario.domain.js';
import type { UsuarioEntity } from '../infra/usuario.entity.js';

describe('UsuarioMapper', () => {
  describe('constructor', () => {
    test('Deve criar uma instância de UsuarioMapper', () => {
      const mapper = new UsuarioMapper();
      expect(mapper).toBeInstanceOf(UsuarioMapper);
    });
  });

  describe('domainParaEntity', () => {
    test('Deve converter um Usuario do domínio para UsuarioEntity', () => {
      // ARRANGE
      const dataCriacao = new Date(2026, 0, 15);
      const dataAtualizacao = new Date(2026, 0, 20);
      const usuario = Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        perfilId: 1,
        setorId: 2,
        ativo: true,
        dataCriacao,
        dataAtualizacao,
      });

      // ACT
      const resultado = UsuarioMapper.domainParaEntity(usuario);

      // ASSERT
      expect(resultado.id).toBe(1);
      expect(resultado.nome).toBe('João Silva');
      expect(resultado.login).toBe('joao@email.com');
      expect(resultado.senha).toBe('Senha@123');
      expect(resultado.perfilId).toBe(1);
      expect(resultado.setorId).toBe(2);
      expect(resultado.ativo).toBe(true);
      expect(resultado.dataCriacao).toEqual(dataCriacao);
      expect(resultado.dataAtualizacao).toEqual(dataAtualizacao);
    });

    test('Deve converter enderecosId para array de objetos com id', () => {
      // ARRANGE
      const usuario = Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        ativo: true,
        dataCriacao: new Date(),
        enderecosId: [10, 20, 30],
      });

      // ACT
      const resultado = UsuarioMapper.domainParaEntity(usuario);

      // ASSERT
      expect(resultado.enderecos).toEqual([{ id: 10 }, { id: 20 }, { id: 30 }]);
    });

    test('Deve retornar enderecos como array vazio quando enderecosId for undefined', () => {
      // ARRANGE
      const usuario = Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        ativo: true,
        dataCriacao: new Date(),
      });

      // ACT
      const resultado = UsuarioMapper.domainParaEntity(usuario);

      // ASSERT
      expect(resultado.enderecos).toEqual([]);
    });

    test('Deve converter Usuario com dataExclusao preenchida', () => {
      // ARRANGE
      const dataExclusao = new Date(2026, 1, 10);
      const usuario = Usuario.hidratar({
        id: 2,
        nome: 'Maria Santos',
        login: 'maria@email.com',
        senha: 'Senha@456',
        ativo: false,
        dataCriacao: new Date(2026, 0, 1),
        dataExclusao,
      });

      // ACT
      const resultado = UsuarioMapper.domainParaEntity(usuario);

      // ASSERT
      expect(resultado.dataExclusao).toEqual(dataExclusao);
      expect(resultado.ativo).toBe(false);
    });
  });

  describe('entityParaDomain', () => {
    test('Deve converter uma UsuarioEntity para um Usuario do domínio', () => {
      // ARRANGE
      const dataCriacao = new Date(2026, 0, 15);
      const entity: UsuarioEntity = {
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        perfilId: 1,
        setorId: 2,
        enderecos: [],
        ativo: true,
        dataCriacao,
        dataNascimento: undefined as any,
        dataAtualizacao: undefined as any,
        dataExclusao: undefined,
        perfil: undefined as any,
        setor: undefined as any,
      };

      // ACT
      const resultado = UsuarioMapper.entityParaDomain(entity);

      // ASSERT
      expect(resultado).toBeInstanceOf(Usuario);
      expect(resultado.id).toBe(1);
      expect(resultado.nome).toBe('João Silva');
      expect(resultado.login).toBe('joao@email.com');
      expect(resultado.perfilId).toBe(1);
      expect(resultado.setorId).toBe(2);
      expect(resultado.ativo).toBe(true);
    });

    test('Deve extrair ids dos enderecos ao converter entity para domain', () => {
      // ARRANGE
      const entity: UsuarioEntity = {
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        ativo: true,
        dataCriacao: new Date(),
        dataNascimento: undefined as any,
        dataAtualizacao: undefined as any,
        dataExclusao: undefined,
        perfilId: undefined as any,
        setorId: 1,
        enderecos: [{ id: 10 } as any, { id: 20 } as any],
        perfil: undefined as any,
        setor: undefined as any,
      };

      // ACT
      const resultado = UsuarioMapper.entityParaDomain(entity);

      // ASSERT
      expect(resultado.enderecosId).toEqual([10, 20]);
    });

    test('Deve retornar enderecosId como array vazio quando entity.enderecos for null', () => {
      // ARRANGE
      const entity: UsuarioEntity = {
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        ativo: true,
        dataCriacao: new Date(),
        dataNascimento: undefined as any,
        dataAtualizacao: undefined as any,
        dataExclusao: undefined,
        perfilId: undefined as any,
        setorId: 1,
        enderecos: null as any,
        perfil: undefined as any,
        setor: undefined as any,
      };

      // ACT
      const resultado = UsuarioMapper.entityParaDomain(entity);

      // ASSERT
      expect(resultado.enderecosId).toEqual([]);
    });
  });
});
