import { beforeEach, describe, expect, test, vi } from 'vitest';
import { SetorRepository } from './setor.repository.js';
import { Setor } from './setor.domain.js';
import type { Repository } from 'typeorm';
import type { SetorEntity } from './setor.entity.js';

describe('SetorRepository', () => {
  let setorRepository: SetorRepository;
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      save: vi.fn(), // Simula repository.save()
      findOneBy: vi.fn(), // Simula repository.findOneBy()
    };

    setorRepository = new SetorRepository(
      mockRepository as Repository<SetorEntity>,
    );
  });

  describe('inserir', () => {
    test('Deve inserir um setor com sucesso', async () => {
      // ARRANGE: Prepara os dados para o teste

      // Cria um Setor domain (sem ID, como vem de criar())
      const setorDomain = Setor.criar({ nome: 'TI' });

      // Simula o retorno do banco (Entity com ID)
      const setorEntityRetornado: SetorEntity = {
        id: 1,
        nome: 'TI',
        criadoEm: new Date(),
        alteradoEm: undefined,
        excluidoEm: undefined,
      };

      mockRepository.save.mockResolvedValue(setorEntityRetornado);

      // ACT: Executa a ação
      const resultado = await setorRepository.inserir(setorDomain);

      // ASSERT: Verifica os resultados
      expect(resultado).toBeInstanceOf(Setor);
      expect(resultado.nome).toBe('TI');
      expect(resultado.id).toBe(1);
      expect(mockRepository.save).toHaveBeenCalledOnce();
    });

    test('Deve chamar o mapper para converter domain em entity', async () => {
      const setorDomain = Setor.criar({ nome: 'RH' });

      const setorEntityRetornado: SetorEntity = {
        id: 2,
        nome: 'RH',
        criadoEm: new Date(),
        alteradoEm: undefined,
        excluidoEm: undefined,
      };

      mockRepository.save.mockResolvedValue(setorEntityRetornado);

      await setorRepository.inserir(setorDomain);

      // Verifica se save() foi chamado com um objeto contendo:
      // { nome: 'RH', id: undefined, ... }
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: 'RH',
        }),
      );
    });
  });

  describe('consultarPorId', () => {
    test('Deve retornar um Setor quando encontrado', async () => {
      // ARRANGE
      const id = 1;
      const setorEntityEncontrada: SetorEntity = {
        id: 1,
        nome: 'Financeiro',
        criadoEm: new Date(),
        alteradoEm: undefined,
        excluidoEm: undefined,
      };

      // Configura o mock para retornar a entity quando procurar por ID
      mockRepository.findOneBy.mockResolvedValue(
        setorEntityEncontrada,
      );

      // ACT
      const resultado = await setorRepository.consultarPorId(id);

      // ASSERT
      expect(resultado).toBeInstanceOf(Setor);
      expect(resultado?.nome).toBe('Financeiro');
      expect(resultado?.id).toBe(1);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        id: 1,
      });
    });

    test('Deve retornar null quando setor não existe', async () => {
      // ARRANGE
      // Configura o mock para retornar null (não encontrado)
      mockRepository.findOneBy.mockResolvedValue(null);

      // ACT
      const resultado = await setorRepository.consultarPorId(999);

      // ASSERT
      expect(resultado).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        id: 999,
      });
    });

    test('Deve lançar erro se o repository falhar', async () => {
      // ARRANGE
      // Configura o mock para rejeitar (simular erro do banco)
      mockRepository.findOneBy.mockRejectedValue(
        new Error('Erro de conexão com banco'),
      );

      // ACT & ASSERT
      await expect(setorRepository.consultarPorId(1)).rejects.toThrow(
        'Erro de conexão com banco',
      );
    });
  });
});
