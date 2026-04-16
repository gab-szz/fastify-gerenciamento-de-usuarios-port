import { describe, vi, it, beforeEach, expect } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import type { IPerfilRepository } from '../infra/perfil.repository.interface.js';
import { PerfilRepository } from '../infra/perfil.repository.js';
import { ConsultarPerfilUseCase } from './consultar-perfil.use-case.js';
import { Perfil } from '../domain/perfil.domain.js';

describe('ConsultarPerfilUseCase', () => {
  let mockRepository: IPerfilRepository;
  let useCase: ConsultarPerfilUseCase;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockRepository = {
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      consultarTodos: vi.fn(),
      inserir: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };

    useCase = await configureServiceTest({
      service: ConsultarPerfilUseCase,
      mocks: [{ provide: PerfilRepository, useValue: mockRepository as never }],
    });
  });

  it('Deve consultar um perfil por ID com sucesso', async () => {
    // ARRANGE
    const id = 1;
    const perfil = Perfil.hidratar({
      id,
      nome: 'Administrador',
      criadoEm: new Date(),
    });

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(perfil);

    // ACT
    const retorno = await useCase.porId(id);

    //ASSERT
    expect(mockRepository.consultarPorId).toHaveBeenCalledWith(id);
    expect(mockRepository.consultarPorId).toHaveBeenCalledOnce();
    expect(retorno).toBeInstanceOf(Perfil);
    expect(retorno).equal(perfil);
  });

  it('Deve retornar null quando perfil não existe por ID', async () => {
    // ARRANGE
    const id = 999;
    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT
    const retorno = await useCase.porId(id);

    //ASSERT
    expect(mockRepository.consultarPorId).toHaveBeenCalledWith(id);
    expect(retorno).toBeNull();
  });

  it('Deve consultar um perfil por nome com sucesso', async () => {
    // ARRANGE
    const nome = 'Administrador';
    const perfil = Perfil.hidratar({
      id: 1,
      nome,
      criadoEm: new Date(),
    });

    vi.mocked(mockRepository.consultarPorNome).mockResolvedValue(perfil);

    // ACT
    const retorno = await useCase.porNome(nome);

    //ASSERT
    expect(mockRepository.consultarPorNome).toHaveBeenCalledWith(nome);
    expect(mockRepository.consultarPorNome).toHaveBeenCalledOnce();
    expect(retorno).toBeInstanceOf(Perfil);
    expect(retorno).equal(perfil);
  });

  it('Deve retornar null quando perfil não existe por nome', async () => {
    // ARRANGE
    const nome = 'Inexistente';
    vi.mocked(mockRepository.consultarPorNome).mockResolvedValue(null);

    // ACT
    const retorno = await useCase.porNome(nome);

    //ASSERT
    expect(mockRepository.consultarPorNome).toHaveBeenCalledWith(nome);
    expect(retorno).toBeNull();
  });

  it('Deve consultar todos perfis com sucesso', async () => {
    // ARRANGE
    const perfil = Perfil.hidratar({
      id: 1,
      nome: 'Administrador',
      criadoEm: new Date(),
    });

    vi.mocked(mockRepository.consultarTodos).mockResolvedValue([perfil]);

    // ACT
    const retorno = await useCase.todos();

    //ASSERT
    expect(mockRepository.consultarTodos).toHaveBeenCalledOnce();
    expect(retorno).toBeInstanceOf(Array);
    expect(retorno[0]).equal(perfil);
  });

  it('Deve retornar array vazio quando não há perfis', async () => {
    // ARRANGE
    vi.mocked(mockRepository.consultarTodos).mockResolvedValue([]);

    // ACT
    const retorno = await useCase.todos();

    //ASSERT
    expect(mockRepository.consultarTodos).toHaveBeenCalledOnce();
    expect(retorno).toBeInstanceOf(Array);
    expect(retorno).toHaveLength(0);
  });
});
