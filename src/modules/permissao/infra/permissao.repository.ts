import { Service } from 'fastify-decorators';
import type { Repository } from 'typeorm';
import { PermissaoEntity } from './permissao.entity.js';
import { fonteDeDados } from '../../../database/data-source.js';
import { PermissaoMapper } from '../domain/permissao.mapper.js';
import type { Permissao } from '../domain/permissao.domain.js';
import type { IPermissaoRepository } from './permissao.repository.interface.js';

@Service()
export class PermissaoRepository implements IPermissaoRepository {
  private repositoryInstance: Repository<PermissaoEntity>;

  constructor(repository?: Repository<PermissaoEntity>) {
    this.repositoryInstance =
      repository || fonteDeDados.getRepository(PermissaoEntity);
  }

  private get repository() {
    return this.repositoryInstance;
  }

  async consultarPorId(id: number): Promise<Permissao | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? PermissaoMapper.entityParaDomain(entity) : null;
  }
  async consultarPorNome(nome: string): Promise<Permissao | null> {
    const entity = await this.repository.findOneBy({ nome });
    return entity ? PermissaoMapper.entityParaDomain(entity) : null;
  }

  async consultarTodas(): Promise<Permissao[]> {
    const entities = await this.repository.find();
    return entities.length > 0
      ? entities.map((entity) => PermissaoMapper.entityParaDomain(entity))
      : ([] as Permissao[]);
  }

  async salvar(permissao: Permissao) {
    const dados = PermissaoMapper.domainParaEntity(permissao);
    return PermissaoMapper.entityParaDomain(await this.repository.save(dados));
  }

  async remover(id: number) {
    const affected = await this.repository.delete(id);
    return affected.affected ? true : false;
  }
}
