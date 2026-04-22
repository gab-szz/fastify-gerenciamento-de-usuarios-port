import type { UsuarioEntity } from '../infra/usuario.entity.js';
import { Usuario } from './usuario.domain.js';

export class UsuarioMapper {
  static domainParaEntity(usuario: Usuario): Partial<UsuarioEntity> {
    return {
      id: usuario.id,
      nome: usuario.nome,
      dataNascimento: usuario.dataNascimento,
      perfilId: usuario.perfilId,
      setorId: usuario.setorId,
      enderecos: usuario.enderecosId
        ? usuario.enderecosId.map((id) => ({ id }) as any)
        : [],
      login: usuario.login,
      senha: usuario.senha,
      ativo: usuario.ativo,
      dataCriacao: usuario.dataCriacao,
      dataAtualizacao: usuario.dataAtualizacao,
      dataExclusao: usuario.dataExclusao,
    };
  }

  static entityParaDomain(entity: UsuarioEntity): Usuario {
    return Usuario.hidratar({
      id: entity.id,
      nome: entity.nome,
      dataNascimento: entity.dataNascimento,
      perfilId: entity.perfilId,
      setorId: entity.setorId,
      enderecosId: entity.enderecos
        ? entity.enderecos.map((end) => end.id).filter((id) => id !== undefined)
        : [],
      login: entity.login,
      senha: entity.senha,
      ativo: entity.ativo,
      dataCriacao: entity.dataCriacao,
      dataAtualizacao: entity.dataAtualizacao,
      dataExclusao: entity.dataExclusao,
    });
  }
}
