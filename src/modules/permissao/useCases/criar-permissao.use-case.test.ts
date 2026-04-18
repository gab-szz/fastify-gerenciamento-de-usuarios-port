import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import { CriarPermissaoUseCase } from './criar-permissao.use-case.js';
import { PermissaoRepository } from '../infra/permissao.repository.js';
import { Permissao } from '../domain/permissao.domain.js';
import type { IPermissaoRepository } from '../infra/permissao.repository.interface.js';

describe('CriarPermissaoUseCase', () => {
  let mockRepository: IPermissaoRepository;
  let useCase: CriarPermissaoUseCase;

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
      service: CriarPermissaoUseCase,
      mocks: [
        { provide: PermissaoRepository, useValue: mockRepository as never },
      ],
    });
  });

  test('Deve criar uma permissão com sucesso', async () => {
    // ARRANGE
    const entrada = { nome: 'CRIAR_USUARIO' };

    vi.mocked(mockRepository.consultarPorNome).mockResolvedValue(null);
    vi.mocked(mockRepository.salvar).mockResolvedValue(
      Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        criadoEm: new Date(),
      }),
    );

    // ACT
    const saida = await useCase.exec(entrada);

    // ASSERT
    expect(saida).toBeInstanceOf(Permissao);
    expect(saida?.id).toBe(1);
    expect(saida?.nome).toBe('CRIAR_USUARIO');
    expect(mockRepository.consultarPorNome).toHaveBeenCalledWith(
      'CRIAR_USUARIO',
    );
    expect(mockRepository.salvar).toHaveBeenCalledOnce();
  });

  test('Deve converter o nome para maiúsculas antes de salvar', async () => {
    // ARRANGE
    const entrada = { nome: 'criar_usuario' };

    vi.mocked(mockRepository.consultarPorNome).mockResolvedValue(null);
    vi.mocked(mockRepository.salvar).mockResolvedValue(
      Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        criadoEm: new Date(),
      }),
    );

    // ACT
    await useCase.exec(entrada);

    // ASSERT
    expect(mockRepository.consultarPorNome).toHaveBeenCalledWith(
      'CRIAR_USUARIO',
    );
  });

  test('Deve lançar erro quando permissão com mesmo nome já existir', async () => {
    // ARRANGE
    const entrada = { nome: 'CRIAR_USUARIO' };

    vi.mocked(mockRepository.consultarPorNome).mockResolvedValue(
      Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        criadoEm: new Date(),
      }),
    );

    // ACT & ASSERT
    await expect(useCase.exec(entrada)).rejects.toThrow(
      'Já existe uma permissão cadastrada com o nome: CRIAR_USUARIO',
    );
    expect(mockRepository.salvar).not.toHaveBeenCalled();
  });
});
