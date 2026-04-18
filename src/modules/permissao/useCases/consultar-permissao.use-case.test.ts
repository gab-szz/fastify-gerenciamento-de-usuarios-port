import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ConsultarPermissaoUseCase } from './consultar-permissao.use-case.js';
import { Permissao } from '../domain/permissao.domain.js';
import type { IPermissaoRepository } from '../infra/permissao.repository.interface.js';

describe('ConsultarPermissaoUseCase', () => {
  let mockRepository: IPermissaoRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      consultarTodas: vi.fn(),
      salvar: vi.fn(),
      remover: vi.fn(),
    };
  });

  describe('porId', () => {
    test('Deve consultar uma permissão por ID com sucesso', async () => {
      // ARRANGE
      const useCase = new ConsultarPermissaoUseCase(mockRepository);
      const permissao = Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        criadoEm: new Date(),
      });
      vi.mocked(mockRepository.consultarPorId).mockResolvedValue(permissao);

      // ACT
      const saida = await useCase.porId(1);

      // ASSERT
      expect(saida).toBeInstanceOf(Permissao);
      expect(saida?.id).toBe(1);
      expect(saida?.nome).toBe('CRIAR_USUARIO');
      expect(mockRepository.consultarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar null quando permissão não for encontrada', async () => {
      // ARRANGE
      const useCase = new ConsultarPermissaoUseCase(mockRepository);
      vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

      // ACT
      const saida = await useCase.porId(1);

      // ASSERT
      expect(saida).toBeNull();
    });

    test('Deve lançar erro quando ID for inválido (0)', async () => {
      // ARRANGE
      const useCase = new ConsultarPermissaoUseCase(mockRepository);

      // ACT & ASSERT
      await expect(useCase.porId(0)).rejects.toThrow(
        'Um ID válido deve ser fornecido.',
      );
    });

    test('Deve lançar erro quando ID for negativo', async () => {
      // ARRANGE
      const useCase = new ConsultarPermissaoUseCase(mockRepository);

      // ACT & ASSERT
      await expect(useCase.porId(-1)).rejects.toThrow(
        'Um ID válido deve ser fornecido.',
      );
    });
  });

  describe('porNome', () => {
    test('Deve consultar uma permissão por nome com sucesso', async () => {
      // ARRANGE
      const useCase = new ConsultarPermissaoUseCase(mockRepository);
      const permissao = Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        criadoEm: new Date(),
      });
      vi.mocked(mockRepository.consultarPorNome).mockResolvedValue(permissao);

      // ACT
      const saida = await useCase.porNome('CRIAR_USUARIO');

      // ASSERT
      expect(saida).toBeInstanceOf(Permissao);
      expect(mockRepository.consultarPorNome).toHaveBeenCalledWith(
        'CRIAR_USUARIO',
      );
    });

    test('Deve lançar erro quando nome for vazio', async () => {
      // ARRANGE
      const useCase = new ConsultarPermissaoUseCase(mockRepository);

      // ACT & ASSERT
      await expect(useCase.porNome('')).rejects.toThrow(
        'Um nome válido deve ser fornecido.',
      );
    });
  });

  describe('todas', () => {
    test('Deve consultar todas as permissões com sucesso', async () => {
      // ARRANGE
      const useCase = new ConsultarPermissaoUseCase(mockRepository);
      const permissoes = [
        Permissao.hidratar({
          id: 1,
          nome: 'CRIAR_USUARIO',
          criadoEm: new Date(),
        }),
        Permissao.hidratar({
          id: 2,
          nome: 'EDITAR_USUARIO',
          criadoEm: new Date(),
        }),
      ];
      vi.mocked(mockRepository.consultarTodas).mockResolvedValue(permissoes);

      // ACT
      const saida = await useCase.todas();

      // ASSERT
      expect(saida).toHaveLength(2);
      expect(saida[0]).toBeInstanceOf(Permissao);
      expect(mockRepository.consultarTodas).toHaveBeenCalledOnce();
    });

    test('Deve retornar lista vazia quando não houver permissões', async () => {
      // ARRANGE
      const useCase = new ConsultarPermissaoUseCase(mockRepository);
      vi.mocked(mockRepository.consultarTodas).mockResolvedValue([]);

      // ACT
      const saida = await useCase.todas();

      // ASSERT
      expect(saida).toHaveLength(0);
    });
  });
});
