import { beforeEach, describe, expect, test, vi } from 'vitest';
import { SetorRepository } from './setor.repository.js';
import { Setor } from '../domain/setor.domain.js';
import type { Repository } from 'typeorm';
import type { SetorEntity } from './setor.entity.js';

describe('SetorRepository', () => {
  let setorRepository: SetorRepository;
  let mockTypeorm: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockTypeorm = {
      save: vi.fn(),
      findOneBy: vi.fn(),
      find: vi.fn(),
      delete: vi.fn(),
    };

    setorRepository = new SetorRepository(
      mockTypeorm as Repository<SetorEntity>,
    );
  });

  describe('inserir', () => {
    test('Deve inserir um setor com sucesso', async () => {
      // ARRANGE
      const entrada = Setor.criar({ nome: 'TI' });

      vi.mocked(mockTypeorm.save).mockResolvedValue({
        id: 1,
        nome: 'TI',
        criadoEm: new Date(),
        alteradoEm: undefined,
        excluidoEm: undefined,
      });

      // ACT
      const saida = await setorRepository.inserir(entrada);

      // ASSERT
      expect(saida).toBeInstanceOf(Setor);
      expect(saida.nome).toBe('TI');
      expect(saida.id).toBe(1);
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });
  });

  describe('consultarTodos', () => {
    test('Deve retornar uma lista de setores', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue([
        {
          id: 1,
          nome: 'TI',
          criadoEm: new Date(),
          alteradoEm: undefined,
          excluidoEm: undefined,
        },
        {
          id: 2,
          nome: 'Financeiro',
          criadoEm: new Date(),
          alteradoEm: undefined,
          excluidoEm: undefined,
        },
      ]);

      // ACT
      const saida = await setorRepository.consultarTodos();

      // ASSERT
      expect(saida).toHaveLength(2);
      expect(saida[0]).toBeInstanceOf(Setor);
      expect(saida[0]!.nome).toBe('TI');
      expect(saida[1]).toBeInstanceOf(Setor);
      expect(saida[1]!.nome).toBe('Financeiro');
      expect(mockTypeorm.find).toHaveBeenCalledOnce();
    });

    test('Deve retornar uma lista vazia quando não houver setores', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue([]);

      // ACT
      const saida = await setorRepository.consultarTodos();

      // ASSERT
      expect(saida).toHaveLength(0);
      expect(mockTypeorm.find).toHaveBeenCalledOnce();
    });
  });

  describe('consultarPorId', () => {
    test('Deve retornar um Setor quando encontrado', async () => {
      // ARRANGE
      const entrada = 1;

      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue({
        id: 1,
        nome: 'Financeiro',
        criadoEm: new Date(),
        alteradoEm: undefined,
        excluidoEm: undefined,
      });

      // ACT
      const saida = await setorRepository.consultarPorId(entrada);

      // ASSERT
      expect(saida).toBeInstanceOf(Setor);
      expect(saida?.nome).toBe('Financeiro');
      expect(saida?.id).toBe(1);
      expect(mockTypeorm.findOneBy).toHaveBeenCalledWith({
        id: entrada,
      });
    });

    test('Deve retornar null quando setor não existe', async () => {
      // ARRANGE
      const entrada = 999;

      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue(null);

      // ACT
      const saida = await setorRepository.consultarPorId(entrada);

      // ASSERT
      expect(saida).toBeNull();
      expect(mockTypeorm.findOneBy).toHaveBeenCalledWith({
        id: entrada,
      });
    });

    test('Deve lançar erro se o repository falhar', async () => {
      // ARRANGE
      const entrada = 1;

      vi.mocked(mockTypeorm.findOneBy).mockRejectedValue(
        new Error('Erro de conexão com banco'),
      );

      // ACT & ASSERT
      await expect(setorRepository.consultarPorId(entrada)).rejects.toThrow(
        'Erro de conexão com banco',
      );
    });
  });

  describe('consultarPeloNome', () => {
    test('Deve retornar um Setor quando encontrado', async () => {
      // ARRANGE
      const entrada = 'TI';

      vi.mocked(mockTypeorm.find).mockResolvedValue([
        {
          id: 1,
          nome: 'TI',
          criadoEm: new Date(),
          alteradoEm: undefined,
          excluidoEm: undefined,
        },
      ]);

      // ACT
      const saida = await setorRepository.consultarPorNome(entrada);

      // ASSERT
      expect(saida[0]).toBeInstanceOf(Setor);
      expect(saida[0]!.nome).toBe('TI');
      expect(saida[0]!.id).toBe(1);
      expect(mockTypeorm.find).toHaveBeenCalledWith({
        where: expect.any(Object),
      });
    });

    test('Deve retornar lista vazia quando setor não existe', async () => {
      // ARRANGE
      const entrada = 'Não existe';

      vi.mocked(mockTypeorm.find).mockResolvedValue([]);

      // ACT
      const saida = await setorRepository.consultarPorNome(entrada);

      // ASSERT
      expect(saida).toStrictEqual([]);
      expect(mockTypeorm.find).toHaveBeenCalledWith({
        where: expect.any(Object),
      });
    });
  });

  describe('atualizar', () => {
    test('Deve atualizar com sucesso', async () => {
      // ARRANGE
      const entrada = Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
        criadoEm: new Date(2026, 1, 23),
      });

      vi.mocked(mockTypeorm.save).mockResolvedValue({
        id: 1,
        nome: 'TI',
        criadoEm: new Date(2026, 1, 23),
        alteradoEm: new Date(),
      });

      // ACT
      const saida = await setorRepository.atualizar(entrada);

      // ASSERT
      expect(saida).toBeInstanceOf(Setor);
      expect(saida!.nome).toBe('TI');
      expect(saida!.id).toBe(1);
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });

    test('Deve retornar null em objeto não existente', async () => {
      // ARRANGE
      const entrada = Setor.hidratar({
        id: 999,
        nome: 'Não existe',
      });

      vi.mocked(mockTypeorm.save).mockResolvedValue(null);

      // ACT
      const saida = await setorRepository.atualizar(entrada);

      // ASSERT
      expect(saida).toBeNull();
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });
  });

  describe('remover', () => {
    test('Deve remover um setor com sucesso', async () => {
      // ARRANGE
      const entrada = Setor.hidratar({
        id: 1,
        nome: 'TI',
      });

      vi.mocked(mockTypeorm.delete).mockResolvedValue({ affected: 1 });

      // ACT
      const saida = await setorRepository.remover(entrada);

      // ASSERT
      expect(saida).toBe(true);
      expect(mockTypeorm.delete).toHaveBeenCalledWith(1);
    });

    test('Deve retornar false quando não conseguir remover', async () => {
      // ARRANGE
      const entrada = Setor.hidratar({
        id: 999,
        nome: 'Não existe',
      });

      vi.mocked(mockTypeorm.delete).mockResolvedValue({ affected: 0 });

      // ACT
      const saida = await setorRepository.remover(entrada);

      // ASSERT
      expect(saida).toBe(false);
      expect(mockTypeorm.delete).toHaveBeenCalledWith(999);
    });
  });
});
