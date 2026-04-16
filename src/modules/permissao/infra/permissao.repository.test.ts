import type { Repository } from 'typeorm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { PermissaoEntity } from './permissao.entity.js';
import type { IPermissaoRepository } from './permissao.repository.interface.js';
import { PermissaoRepository } from './permissao.repository.js';
import { Permissao } from '../domain/permissao.domain.js';

describe('PermissaoRepository', () => {
  let permissaoRepository: IPermissaoRepository;
  let mockTypeorm: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockTypeorm = {
      save: vi.fn(),
      findOneBy: vi.fn(),
      find: vi.fn(),
      delete: vi.fn(),
    };

    permissaoRepository = new PermissaoRepository(
      mockTypeorm as Repository<PermissaoEntity>,
    );
  });

  it('Deve consultar um perfil por ID com sucesso', async () => {
    //ARRANGE
    const id = 1;
    const permissao = Permissao.hidratar({
      id,
      nome: 'CADASTRAR_CLIENTES',
      criadoEm: new Date(),
    });
    vi.mocked(mockTypeorm.findOneBy).mockResolvedValue(permissao);

    //ACT
    const retorno = await permissaoRepository.consultarPorId(id);

    //ASSERT
    expect(retorno).toBeInstanceOf(Permissao);
    expect(retorno).equal(permissao);
    expect(mockTypeorm.findOneby).toHaveBeenCalledOnce();
  });
});
