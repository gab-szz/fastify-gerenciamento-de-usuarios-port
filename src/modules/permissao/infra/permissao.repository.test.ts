import type { Repository } from 'typeorm';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { PermissaoEntity } from './permissao.entity.js';
import { PermissaoRepository } from './permissao.repository.js';
import { Permissao } from '../domain/permissao.domain.js';

describe('PermissaoRepository', () => {
  let permissaoRepository: PermissaoRepository;
  let mockTypeorm: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockTypeorm = {
      save: vi.fn(),
      findOneBy: vi.fn(),
      find: vi.fn(),
      delete: vi.fn(),
    };

    permissaoRepository = new PermissaoRepository(
      mockTypeorm as Repository<PermissaoEntity>,
    );
  });

  describe('consultarPorId', () => {
    test('Deve consultar uma permissão por ID com sucesso', async () => {
      // ARRANGE
      const entityMock = {
        id: 1,
        nome: 'CADASTRAR_CLIENTES',
        criadoEm: new Date(),
        atualizadoEm: undefined,
      };
      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue(entityMock);

      // ACT
      const retorno = await permissaoRepository.consultarPorId(1);

      // ASSERT
      expect(retorno).toBeInstanceOf(Permissao);
      expect(retorno?.id).toBe(1);
      expect(retorno?.nome).toBe('CADASTRAR_CLIENTES');
      expect(mockTypeorm.findOneBy).toHaveBeenCalledOnce();
    });

    test('Deve retornar null quando permissão não for encontrada', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue(null);

      // ACT
      const retorno = await permissaoRepository.consultarPorId(99);

      // ASSERT
      expect(retorno).toBeNull();
    });
  });

  describe('consultarPorNome', () => {
    test('Deve consultar uma permissão por nome com sucesso', async () => {
      // ARRANGE
      const entityMock = {
        id: 1,
        nome: 'CADASTRAR_CLIENTES',
        criadoEm: new Date(),
      };
      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue(entityMock);

      // ACT
      const retorno =
        await permissaoRepository.consultarPorNome('CADASTRAR_CLIENTES');

      // ASSERT
      expect(retorno).toBeInstanceOf(Permissao);
      expect(retorno?.nome).toBe('CADASTRAR_CLIENTES');
    });

    test('Deve retornar null quando permissão não for encontrada pelo nome', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue(null);

      // ACT
      const retorno = await permissaoRepository.consultarPorNome('INEXISTENTE');

      // ASSERT
      expect(retorno).toBeNull();
    });
  });

  describe('consultarTodas', () => {
    test('Deve retornar uma lista de permissões', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue([
        { id: 1, nome: 'CRIAR_USUARIO', criadoEm: new Date() },
        { id: 2, nome: 'EDITAR_USUARIO', criadoEm: new Date() },
      ]);

      // ACT
      const retorno = await permissaoRepository.consultarTodas();

      // ASSERT
      expect(retorno).toHaveLength(2);
      expect(retorno[0]).toBeInstanceOf(Permissao);
      expect(retorno[1]).toBeInstanceOf(Permissao);
    });

    test('Deve retornar lista vazia quando não houver permissões', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue([]);

      // ACT
      const retorno = await permissaoRepository.consultarTodas();

      // ASSERT
      expect(retorno).toHaveLength(0);
    });
  });

  describe('salvar', () => {
    test('Deve salvar uma nova permissão com sucesso', async () => {
      // ARRANGE
      const permissao = Permissao.criar({ nome: 'CRIAR_USUARIO' });
      vi.mocked(mockTypeorm.save).mockResolvedValue({
        id: 1,
        nome: 'CRIAR_USUARIO',
        criadoEm: new Date(),
      });

      // ACT
      const retorno = await permissaoRepository.salvar(permissao);

      // ASSERT
      expect(retorno).toBeInstanceOf(Permissao);
      expect(retorno?.id).toBe(1);
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });
  });

  describe('remover', () => {
    test('Deve remover uma permissão com sucesso', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.delete).mockResolvedValue({ affected: 1 });

      // ACT
      const retorno = await permissaoRepository.remover(1);

      // ASSERT
      expect(retorno).toBe(true);
      expect(mockTypeorm.delete).toHaveBeenCalledWith(1);
    });

    test('Deve retornar false quando nenhuma permissão for afetada', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.delete).mockResolvedValue({ affected: 0 });

      // ACT
      const retorno = await permissaoRepository.remover(99);

      // ASSERT
      expect(retorno).toBe(false);
    });
  });
});
