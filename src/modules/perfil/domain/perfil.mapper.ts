import type { PerfilEntity } from '../infra/perfil.entity.js';
import { Perfil } from './perfil.domain.js';

export class PerfilMapper {
  constructor() {}

  static domainParaEntity(domain: Perfil): Partial<PerfilEntity> {
    return {
      id: domain.id,
      nome: domain.nome,
      criadoEm: domain.criadoEm,
      alteradoEm: domain.alteradoEm,
      excluidoEm: domain.excluidoEm,
    };
  }

  static entityParaDomain(entity: PerfilEntity) {
    return Perfil.hidratar({
      id: entity.id,
      nome: entity.nome,
      criadoEm: entity.criadoEm,
      alteradoEm: entity.alteradoEm,
      excluidoEm: entity.excluidoEm,
    });
  }
}
