import { beforeEach, describe, expect, test, vi, type Mock } from 'vitest';
import type { ISetorRepository } from '../infra/setor.repository.js';
import { ConsultarSetorUseCases } from './consultar-setor.use-case.js';
import { Setor } from '../domain/setor.domain.js';

describe('ConsultarSetorUseCase', () => {
  let mockRepository: ISetorRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      inserir: vi.fn(),
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      consultarTodos: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };
  });

  describe('porId', () => {
    test('Deve consultar um setor por ID com sucesso', async () => {
      //ARRANGE
      const inputId = 1;
      const useCase = new ConsultarSetorUseCases(mockRepository);

      (mockRepository.consultarPorId as Mock).mockResolvedValue(
        Setor.hidratar({
          id: 1,
          nome: 'Tecnologia da Informação',
        }),
      );

      //ACT
      const saida = await useCase.porId(inputId);

      //ASSERT
      expect(saida).toBeInstanceOf(Setor);
      expect(saida?.id).toBe(1);
      expect(saida?.nome).toBe('Tecnologia da Informação');
      expect(mockRepository.consultarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar erro quando ID for inválido', async () => {
      //ARRANGE
      const useCase = new ConsultarSetorUseCases(mockRepository);

      //ACT & ASSERT
      await expect(useCase.porId(0)).rejects.toThrow(
        'A valid ID must be provided.',
      );
      await expect(useCase.porId(-1)).rejects.toThrow(
        'A valid ID must be provided.',
      );
    });
  });

  describe('porNome', () => {
    test('Deve consultar setores por nome com sucesso', async () => {
      //ARRANGE
      const inputNome = 'Tecnologia';
      const useCase = new ConsultarSetorUseCases(mockRepository);

      (mockRepository.consultarPorNome as Mock).mockResolvedValue([
        Setor.hidratar({
          id: 1,
          nome: 'Tecnologia da Informação',
        }),
        Setor.hidratar({
          id: 2,
          nome: 'Tecnologia e Inovação',
        }),
      ]);

      //ACT
      const saida = await useCase.porNome(inputNome);

      //ASSERT
      expect(saida).toHaveLength(2);
      expect(mockRepository.consultarPorNome).toHaveBeenCalledWith(
        'Tecnologia',
      );
    });

    test('Deve retornar erro quando nome for inválido', async () => {
      //ARRANGE
      const useCase = new ConsultarSetorUseCases(mockRepository);

      //ACT & ASSERT
      await expect(useCase.porNome('')).rejects.toThrow(
        'A valid Name must be provided.',
      );
    });
  });

  describe('todos', () => {
    test('Deve consultar todos os setores com sucesso', async () => {
      //ARRANGE
      const useCase = new ConsultarSetorUseCases(mockRepository);

      (mockRepository.consultarTodos as Mock).mockResolvedValue([
        Setor.hidratar({
          id: 1,
          nome: 'Tecnologia da Informação',
        }),
        Setor.hidratar({
          id: 2,
          nome: 'Recursos Humanos',
        }),
        Setor.hidratar({
          id: 3,
          nome: 'Financeiro',
        }),
      ]);

      //ACT
      const saida = await useCase.todos();

      //ASSERT
      expect(saida).toHaveLength(3);
      expect(saida[0]).toBeInstanceOf(Setor);
      expect(mockRepository.consultarTodos).toHaveBeenCalledTimes(1);
    });

    test('Deve retornar lista vazia quando não houver setores', async () => {
      //ARRANGE
      const useCase = new ConsultarSetorUseCases(mockRepository);

      (mockRepository.consultarTodos as Mock).mockResolvedValue([]);

      //ACT
      const saida = await useCase.todos();

      //ASSERT
      expect(saida).toHaveLength(0);
      expect(mockRepository.consultarTodos).toHaveBeenCalledTimes(1);
    });
  });
});
