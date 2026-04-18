import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import { AtualizarPermissaoUseCase } from './atualizar-permissao.use-case.js';
import { PermissaoRepository } from '../infra/permissao.repository.js';
import { Permissao } from '../domain/permissao.domain.js';
import type { IPermissaoRepository } from '../infra/permissao.repository.interface.js';

describe('AtualizarPermissaoUseCase', () => {
  let mockRepository: IPermissaoRepository;
  let useCase: AtualizarPermissaoUseCase;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockRepository = {
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      consultarTodas: vi.fn(),
      salvar: vi.fn(),
      remover: vi.fn(),
    };

    useCase = await configureServiceTest({
      service: AtualizarPermissaoUseCase,
      mocks: [
        { provide: PermissaoRepository, useValue: mockRepository as never },
      ],
    });
  });

  test('Deve atualizar uma permissão com sucesso', async () => {
    // ARRANGE
    const entrada = {
      id: 1,
      nome: 'editar_usuario',
      descricao: 'Nova descrição',
    };

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        criadoEm: new Date(),
      }),
    );
    vi.mocked(mockRepository.salvar).mockResolvedValue(
      Permissao.hidratar({
        id: 1,
        nome: 'EDITAR_USUARIO',
        descricao: 'Nova descrição',
        criadoEm: new Date(),
        atualizadoEm: new Date(),
      }),
    );

    // ACT
    const saida = await useCase.exec(entrada);

    // ASSERT
    expect(saida).toBeInstanceOf(Permissao);
    expect(saida?.nome).toBe('EDITAR_USUARIO');
    expect(mockRepository.consultarPorId).toHaveBeenCalledWith(1);
    expect(mockRepository.salvar).toHaveBeenCalledOnce();
  });

  test('Deve converter o nome para maiúsculas antes de atualizar', async () => {
    // ARRANGE
    const entrada = { id: 1, nome: 'editar_usuario' };

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        criadoEm: new Date(),
      }),
    );
    vi.mocked(mockRepository.salvar).mockResolvedValue(
      Permissao.hidratar({
        id: 1,
        nome: 'EDITAR_USUARIO',
        criadoEm: new Date(),
      }),
    );

    // ACT
    await useCase.exec(entrada);

    // ASSERT
    expect(mockRepository.consultarPorId).toHaveBeenCalledWith(1);
  });

  test('Deve lançar erro quando permissão não for encontrada pelo ID', async () => {
    // ARRANGE
    const entrada = { id: 99, nome: 'EDITAR_USUARIO' };

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(useCase.exec(entrada)).rejects.toThrow(
      'Não encontramos uma permissão com o id 99',
    );
    expect(mockRepository.salvar).not.toHaveBeenCalled();
  });
});
