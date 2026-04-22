import type { Repository } from 'typeorm';
import type { IUsuarioRepository } from './usuario.repository.interface.js';
import { UsuarioEntity } from './usuario.entity.js';
import { fonteDeDados } from '../../../database/data-source.js';
import type { Usuario } from '../domain/usuario.domain.js';
import { UsuarioMapper } from '../domain/usuario.mapper.js';
import { Service } from 'fastify-decorators';

@Service()
export class UsuarioRepository implements IUsuarioRepository {
  private readonly repositoryInstance: Repository<UsuarioEntity>;

  constructor(repository?: Repository<UsuarioEntity>) {
    this.repositoryInstance =
      repository ?? fonteDeDados.getRepository(UsuarioEntity);
  }

  async inserir(usuario: Usuario): Promise<Usuario> {
    const data = UsuarioMapper.domainParaEntity(usuario);
    const entity = this.repositoryInstance.create(data);
    const saved = await this.repositoryInstance.save(entity);
    return UsuarioMapper.entityParaDomain(saved);
  }

  async atualizar(usuario: Usuario): Promise<Usuario> {
    const data = UsuarioMapper.domainParaEntity(usuario);
    const entity = this.repositoryInstance.create({ id: usuario.id, ...data });
    const saved = await this.repositoryInstance.save(entity);
    return UsuarioMapper.entityParaDomain(saved);
  }

  async consultarTodos(): Promise<Usuario[]> {
    const entities = await this.repositoryInstance.find();
    return entities.map((e) => UsuarioMapper.entityParaDomain(e));
  }

  async consultarPorId(id: number): Promise<Usuario | null> {
    const entity = await this.repositoryInstance.findOneBy({ id });
    return entity ? UsuarioMapper.entityParaDomain(entity) : null;
  }

  async consultarPorLogin(login: string): Promise<Usuario | null> {
    const entity = await this.repositoryInstance.findOneBy({ login });
    return entity ? UsuarioMapper.entityParaDomain(entity) : null;
  }
}
