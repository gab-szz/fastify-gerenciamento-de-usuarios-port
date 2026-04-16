import { PermissaoEntity } from '../infra/permissao.entity.js';
import { Permissao } from './permissao.domain.js';

export class PermissaoMapper {
  static domainParaEntity(permissao: Permissao): PermissaoEntity {
    const entity = new PermissaoEntity();
    entity.id = permissao.id!;
    entity.nome = permissao.nome;
    entity.descricao = permissao.descricao;
    entity.criadoEm = permissao.criadoEm!;
    entity.atualizadoEm = permissao.atualizadoEm;
    return entity;
  }

  static entityParaDomain(entity: PermissaoEntity): Permissao {
    return Permissao.hidratar({
      id: entity.id,
      nome: entity.nome,
      descricao: entity.descricao,
      criadoEm: entity.criadoEm,
      atualizadoEm: entity.atualizadoEm,
    });
  }
}
