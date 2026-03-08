import { beforeEach, describe, expect, test, vi, type Mock } from 'vitest';
import type { ISetorRepository } from '../infra/setor.repository.js';
import { ExcluirSetorUseCase } from './excluir-setor.use-case.js';
import { Setor } from '../domain/setor.domain.js';

describe('RemoverSetorUseCase', () => {
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

  test('Deve remover um setor com sucesso', async () => {
    //ARRANGE
    const inputId = 1;
    const useCase = new ExcluirSetorUseCase(mockRepository);

    (mockRepository.consultarPorId as Mock).mockResolvedValue(
      Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
        excluidoEm: undefined,
      }),
    );
    (mockRepository.atualizar as Mock).mockResolvedValue(
      Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
        excluidoEm: new Date(),
      }),
    );
    //TODO -> Mockar retorno do objeto setor com os dados (data de exclusão)

    //ACT
    const saida = await useCase.executar(inputId);

    //ASSERT
    expect(saida).toBeInstanceOf(Setor);
    expect(saida?.excluidoEm).toBeDefined();
  });
});
