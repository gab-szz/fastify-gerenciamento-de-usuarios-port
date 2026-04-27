import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import type { IUsuarioRepository } from '../infra/usuario.repository.interface.js';
import { UsuarioRepository } from '../infra/usuario.repository.js';
import { CriarUsuarioUseCase } from './criar-usuario.use-case.js';
import { Usuario } from '../domain/usuario.domain.js';

describe('CriarUsuarioUseCase', () => {
  let mockRepository: IUsuarioRepository;
  let useCase: CriarUsuarioUseCase;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockRepository = {
      inserir: vi.fn(),
      atualizar: vi.fn(),
      consultarTodos: vi.fn(),
      consultarPorId: vi.fn(),
      consultarPorLogin: vi.fn(),
    };

    useCase = await configureServiceTest({
      service: CriarUsuarioUseCase,
      mocks: [
        { provide: UsuarioRepository, useValue: mockRepository as never },
      ],
    });
  });

  test('Deve criar um usuário com sucesso', async () => {
    // ARRANGE
    const entrada = {
      nome: 'João Silva',
      login: 'joao@email.com',
      senha: 'Senha@123',
      perfilId: 1,
      setorId: 1,
    };

    vi.mocked(mockRepository.consultarPorLogin).mockResolvedValue(null);
    vi.mocked(mockRepository.inserir).mockResolvedValue(
      Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        perfilId: 1,
        setorId: 1,
        ativo: true,
        dataCriacao: new Date(),
      }),
    );

    // ACT
    const saida = await useCase.exec(entrada);

    // ASSERT
    expect(saida).toBeInstanceOf(Usuario);
    expect(saida.nome).toBe('João Silva');
    expect(saida.id).toBe(1);
  });

  test('Deve retornar erro ao criar usuário com login já existente', async () => {
    // ARRANGE
    const entrada = {
      nome: 'João Silva',
      login: 'joao@email.com',
      senha: 'Senha@123',
      perfilId: 1,
      setorId: 1,
    };

    vi.mocked(mockRepository.consultarPorLogin).mockResolvedValue(
      Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        ativo: true,
        dataCriacao: new Date(),
      }),
    );

    // ACT & ASSERT
    await expect(useCase.exec(entrada)).rejects.toThrow(
      'Usuário já existe com esse login',
    );
  });
});
