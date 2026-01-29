import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
  type Mock,
} from 'vitest';
import type { ISetorRepository } from '../infra/setor.repository.js';
import { CriarSetorUseCase } from './criar-setor.use-case.js';
import { Setor } from '../domain/setor.domain.js';

// Entenda o objetivo do teste:
// Você quer garantir que, ao executar o use case com dados válidos, um setor é criado com sucesso.

// Identifique as dependências:
// O CriarSetorUseCase depende de um repositório (ISetorRepository). No teste, você deve mockar esse repositório para controlar o comportamento dele.

// Monte o cenário:

// Crie um mock do repositório com métodos como consultarPorNome (retornando null para simular que não existe setor com aquele nome) e inserir (retornando um setor criado).
// Instancie o use case passando esse mock.
// Defina o input:
// Crie um objeto com os dados necessários para criar um setor (por exemplo, { nome: 'TI' }).

// Execute o método:
// Chame o método executar do use case com o input.

// Faça asserções:
// Verifique se o setor foi criado corretamente e se os métodos do mock foram chamados como esperado.

describe('CriarSetorUseCase', () => {
  let mockRepository: ISetorRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      inserir: vi.fn(),
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };
  });

  test('Deve criar um setor com sucesso', async () => {
    //ARRANGE
    const entrada = { nome: 'Tecnologia da Informação' };
    const useCase = new CriarSetorUseCase(mockRepository);

    const setorComId = Setor.hidratar({
      id: 1,
      nome: 'Tecnologia da Informação',
    });

    (mockRepository.consultarPorNome as Mock).mockResolvedValue(null);
    (mockRepository.inserir as Mock).mockResolvedValue(setorComId);

    //ACT
    const saida = await useCase.executar(entrada);

    //ASSERT
    expect(saida).toBeInstanceOf(Setor);
    expect(saida.nome).toBe('Tecnologia da Informação');
    expect(saida.id).toBe(1);
  });

  test('Deve retornar erro ao criar um setor com nome já existente', async () => {
    //ARRANGE
    const entrada = { nome: 'Tecnologia da Informação' };
    const useCase = new CriarSetorUseCase(mockRepository);

    (mockRepository.consultarPorNome as Mock).mockResolvedValue({
      nome: 'Tecnologia da Informação',
    } as Setor);

    //ACT & ASSERT
    await expect(useCase.executar(entrada)).rejects.toThrow(
      'Já existe um Setor cadastrado com esse nome',
    );
  });
});
