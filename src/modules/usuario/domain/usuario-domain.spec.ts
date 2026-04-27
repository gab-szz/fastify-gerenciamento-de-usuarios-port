import { beforeEach, describe, expect, test } from 'vitest';
import { Usuario } from './usuario.domain.js';

describe('Usuario', () => {
  const dadosValidos = {
    nome: 'João Silva',
    login: 'joao@email.com',
    senha: 'Senha@123',
    perfilId: 1,
    setorId: 1,
  };

  describe('.criar', () => {
    test('Deve criar um usuário com sucesso', () => {
      const usuario = Usuario.criar(dadosValidos);
      expect(usuario).toBeInstanceOf(Usuario);
    });

    test('Deve criar usuário com ativo = true por padrão', () => {
      const usuario = Usuario.criar(dadosValidos);
      expect(usuario.ativo).toBe(true);
    });

    test('Deve criar usuário com dataCriacao preenchida', () => {
      const usuario = Usuario.criar(dadosValidos);
      expect(usuario.dataCriacao).toBeInstanceOf(Date);
    });

    test('Deve criar usuário sem ID', () => {
      const usuario = Usuario.criar(dadosValidos);
      expect(usuario.id).toBeUndefined();
    });

    test('Deve dar erro ao criar usuário sem campos obrigatórios', () => {
      expect(() => Usuario.criar({} as any)).toThrow(
        'Campos obrigatórios ausentes',
      );
    });

    test('Deve dar erro ao criar usuário sem login', () => {
      expect(() =>
        Usuario.criar({ ...dadosValidos, login: undefined as any }),
      ).toThrow('Campos obrigatórios ausentes');
    });

    test('Deve dar erro ao criar usuário com email inválido', () => {
      expect(() =>
        Usuario.criar({ ...dadosValidos, login: 'email-invalido' }),
      ).toThrow('Email inválido');
    });

    test('Deve dar erro ao criar usuário com senha fraca', () => {
      expect(() => Usuario.criar({ ...dadosValidos, senha: '123456' })).toThrow(
        /Senha fraca/,
      );
    });

    test('Deve dar erro ao criar usuário com nome muito curto', () => {
      expect(() => Usuario.criar({ ...dadosValidos, nome: 'Jo' })).toThrow(
        'O nome deve conter pelo menos 4 caracteres',
      );
    });

    test('Deve dar erro ao criar usuário com data de nascimento futura', () => {
      const dataFutura = new Date();
      dataFutura.setFullYear(dataFutura.getFullYear() + 1);
      expect(() =>
        Usuario.criar({ ...dadosValidos, dataNascimento: dataFutura }),
      ).toThrow('Data de nascimento inválida');
    });

    test('Deve aceitar data de nascimento válida no passado', () => {
      const dataPassada = new Date(1990, 5, 15);
      const usuario = Usuario.criar({
        ...dadosValidos,
        dataNascimento: dataPassada,
      });
      expect(usuario.dataNascimento).toEqual(dataPassada);
    });

    test('Deve criar usuário com enderecosId opcionais', () => {
      const usuario = Usuario.criar({ ...dadosValidos, enderecosId: [1, 2] });
      expect(usuario.enderecosId).toEqual([1, 2]);
    });
  });

  describe('.hidratar', () => {
    test('Deve hidratar um usuário com todos os campos', () => {
      const dataCriacao = new Date(2026, 0, 15);
      const usuario = Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        perfilId: 1,
        setorId: 1,
        ativo: true,
        dataCriacao,
      });
      expect(usuario).toBeInstanceOf(Usuario);
      expect(usuario.id).toBe(1);
      expect(usuario.nome).toBe('João Silva');
    });

    test('Deve hidratar um usuário inativo', () => {
      const usuario = Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        ativo: false,
        dataCriacao: new Date(),
      });
      expect(usuario.ativo).toBe(false);
    });
  });

  describe('getters', () => {
    let usuario: Usuario;

    beforeEach(() => {
      usuario = Usuario.criar(dadosValidos);
    });

    test('Deve retornar o nome', () => {
      expect(usuario.nome).toBe('João Silva');
    });

    test('Deve retornar o login', () => {
      expect(usuario.login).toBe('joao@email.com');
    });

    test('Deve retornar a senha', () => {
      expect(usuario.senha).toBe('Senha@123');
    });

    test('Deve retornar perfilId', () => {
      expect(usuario.perfilId).toBe(1);
    });

    test('Deve retornar setorId', () => {
      expect(usuario.setorId).toBe(1);
    });

    test('Deve retornar dataNascimento como undefined para usuário sem data', () => {
      expect(usuario.dataNascimento).toBeUndefined();
    });

    test('Deve retornar dataAtualizacao como undefined para usuário novo', () => {
      expect(usuario.dataAtualizacao).toBeUndefined();
    });

    test('Deve retornar dataExclusao como undefined para usuário ativo', () => {
      expect(usuario.dataExclusao).toBeUndefined();
    });
  });

  describe('.atualizar', () => {
    let usuario: Usuario;

    beforeEach(() => {
      usuario = Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        perfilId: 1,
        setorId: 1,
        ativo: true,
        dataCriacao: new Date(2026, 0, 1),
      });
    });

    test('Deve atualizar um usuário com sucesso', () => {
      const atualizado = usuario.atualizar({
        id: 1,
        nome: 'João Santos',
        login: 'joao.santos@email.com',
        perfilId: 2,
        setorId: 2,
      });
      expect(atualizado).toBeInstanceOf(Usuario);
      expect(atualizado.nome).toBe('João Santos');
      expect(atualizado.login).toBe('joao.santos@email.com');
    });

    test('Deve manter a senha original ao atualizar', () => {
      const atualizado = usuario.atualizar({
        id: 1,
        nome: 'João Santos',
        login: 'joao.santos@email.com',
        perfilId: 2,
        setorId: 2,
      });
      expect(atualizado.senha).toBe('Senha@123');
    });

    test('Deve preencher dataAtualizacao ao atualizar', () => {
      const atualizado = usuario.atualizar({
        id: 1,
        nome: 'João Santos',
        login: 'joao.santos@email.com',
        perfilId: 2,
        setorId: 2,
      });
      expect(atualizado.dataAtualizacao).toBeInstanceOf(Date);
    });

    test('Deve dar erro ao atualizar com nome muito curto', () => {
      expect(() =>
        usuario.atualizar({
          id: 1,
          nome: 'Jo',
          login: 'joao@email.com',
          perfilId: 1,
          setorId: 1,
        }),
      ).toThrow('O nome deve conter pelo menos 4 caracteres');
    });

    test('Deve dar erro ao atualizar com email inválido', () => {
      expect(() =>
        usuario.atualizar({
          id: 1,
          nome: 'João Silva',
          login: 'email-invalido',
          perfilId: 1,
          setorId: 1,
        }),
      ).toThrow('Email inválido');
    });
  });

  describe('.excluir', () => {
    test('Deve excluir um usuário (soft delete)', () => {
      const usuario = Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        ativo: true,
        dataCriacao: new Date(),
      });

      const excluido = usuario.excluir();
      expect(excluido.ativo).toBe(false);
      expect(excluido.dataExclusao).toBeInstanceOf(Date);
    });

    test('Deve manter os dados originais ao excluir', () => {
      const usuario = Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        ativo: true,
        dataCriacao: new Date(),
      });

      const excluido = usuario.excluir();
      expect(excluido.id).toBe(1);
      expect(excluido.nome).toBe('João Silva');
      expect(excluido.login).toBe('joao@email.com');
    });
  });
});
