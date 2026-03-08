import { beforeEach, describe, test, vi } from 'vitest';
import type { ISetorRepository } from '../infra/setor.repository.js';

describe('group', () => {
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

  test('Deve atualizar um setor com sucesso', () => {});
});
