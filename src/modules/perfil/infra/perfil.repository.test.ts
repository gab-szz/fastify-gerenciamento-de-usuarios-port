import { beforeEach, describe, expect, test, vi } from 'vitest';
import { PerfilRepository } from './perfil.repository.js';
import type { Repository } from 'typeorm';
import type { PerfilEntity } from './perfil.entity.js';
import { Perfil } from '../domain/perfil.domain.js';

const entityBase = {
  id: 1,
  nome: 'T.I.',
  criadoEm: new Date(2026, 0, 15),
  alteradoEm: undefined as Date | undefined,
  excluidoEm: undefined as Date | undefined,
};

describe('PerfilRepository', () => {
  let perfilRepository: PerfilRepository;
  let mockTypeorm: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockTypeorm = {
      save: vi.fn(),
      findOneBy: vi.fn(),
      findOne: vi.fn(),
      find: vi.fn(),
      delete: vi.fn(),
    };

    perfilRepository = new PerfilRepository(
      mockTypeorm as Repository<PerfilEntity>,
    );
  });

  describe('consultarPorId', () => {
    test('Deve retornar um perfil pelo ID', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue(entityBase);

      // ACT
      const saida = await perfilRepository.consultarPorId(1);

      // ASSERT
      expect(saida).toBeInstanceOf(Perfil);
      expect(saida?.id).toBe(1);
      expect(saida?.nome).toBe('T.I.');
      expect(mockTypeorm.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    test('Deve retornar null quando perfil não existir', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue(null);

      // ACT
      const saida = await perfilRepository.consultarPorId(999);

      // ASSERT
      expect(saida).toBeNull();
    });
  });

  describe('consultarPorNome', () => {
    test('Deve retornar um perfil pelo nome', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue([entityBase]);

      // ACT
      const saida = await perfilRepository.consultarPorNome('T.I.');

      // ASSERT
      expect(saida[0]).toBeInstanceOf(Perfil);
      expect(saida[0]!.nome).toBe('T.I.');
      expect(mockTypeorm.find).toHaveBeenCalledOnce();
    });

    test('Deve retornar lista vazia quando perfil não existir pelo nome', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue([]);

      // ACT
      const saida = await perfilRepository.consultarPorNome('Inexistente');

      // ASSERT
      expect(saida).toStrictEqual([]);
    });
  });

  describe('consultarTodos', () => {
    test('Deve retornar todos os perfis', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue([
        entityBase,
        { ...entityBase, id: 2, nome: 'Admin' },
      ]);

      // ACT
      const saida = await perfilRepository.consultarTodos();

      // ASSERT
      expect(saida).toHaveLength(2);
      expect(saida[0]).toBeInstanceOf(Perfil);
      expect(mockTypeorm.find).toHaveBeenCalledOnce();
    });

    test('Deve retornar lista vazia quando não houver perfis', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue([]);

      // ACT
      const saida = await perfilRepository.consultarTodos();

      // ASSERT
      expect(saida).toHaveLength(0);
    });

    test('Deve retornar lista vazia quando find retornar null', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue(null as any);

      // ACT
      const saida = await perfilRepository.consultarTodos();

      // ASSERT
      expect(saida).toHaveLength(0);
    });
  });

  describe('inserir', () => {
    test('Deve inserir um perfil com sucesso', async () => {
      // ARRANGE
      const perfil = Perfil.criar({ nome: 'T.I.' });
      vi.mocked(mockTypeorm.save).mockResolvedValue(entityBase);

      // ACT
      const saida = await perfilRepository.inserir(perfil);

      // ASSERT
      expect(saida).toBeInstanceOf(Perfil);
      expect(saida?.id).toBe(1);
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });
  });

  describe('atualizar', () => {
    test('Deve atualizar um perfil com sucesso', async () => {
      // ARRANGE
      const perfil = Perfil.hidratar({ ...entityBase });
      const alteradoEm = new Date();
      vi.mocked(mockTypeorm.save).mockResolvedValue({
        ...entityBase,
        nome: 'Admin',
        alteradoEm,
      });

      // ACT
      const saida = await perfilRepository.atualizar(perfil);

      // ASSERT
      expect(saida).toBeInstanceOf(Perfil);
      expect(saida?.nome).toBe('Admin');
      expect(saida?.alteradoEm).toEqual(alteradoEm);
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });

    test('Deve retornar null quando save retornar null', async () => {
      // ARRANGE
      const perfil = Perfil.hidratar({ ...entityBase });
      vi.mocked(mockTypeorm.save).mockResolvedValue(null as any);

      // ACT
      const saida = await perfilRepository.atualizar(perfil);

      // ASSERT
      expect(saida).toBeNull();
    });
  });

  describe('remover', () => {
    test('Deve remover um perfil com sucesso', async () => {
      // ARRANGE
      const perfil = Perfil.hidratar({ ...entityBase });
      vi.mocked(mockTypeorm.delete).mockResolvedValue({ affected: 1 });

      // ACT
      const saida = await perfilRepository.remover(perfil);

      // ASSERT
      expect(saida).toBe(true);
      expect(mockTypeorm.delete).toHaveBeenCalledWith(1);
    });

    test('Deve retornar false quando perfil não for encontrado', async () => {
      // ARRANGE
      const perfil = Perfil.hidratar({ ...entityBase, id: 999 });
      vi.mocked(mockTypeorm.delete).mockResolvedValue({ affected: 0 });

      // ACT
      const saida = await perfilRepository.remover(perfil);

      // ASSERT
      expect(saida).toBe(false);
      expect(mockTypeorm.delete).toHaveBeenCalledWith(999);
    });
  });
});
