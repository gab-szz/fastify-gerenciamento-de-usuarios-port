import type { Usuario } from '../domain/usuario.domain.js';

export interface IUsuarioRepository {
  inserir(usuario: Usuario): Promise<Usuario>;
  atualizar(usuario: Usuario): Promise<Usuario>;
  consultarTodos(): Promise<Usuario[]>;
  consultarPorId(id: number): Promise<Usuario | null>;
  consultarPorLogin(login: string): Promise<Usuario | null>;
}
