import { beforeEach, describe, expect, test } from "vitest";
import { Setor } from "./setor.domain.js";

describe("Setor", () => {
  let setor: Setor;
  const nome = "Tecnologia da Informação";

  beforeEach(() => {
    setor = Setor.criar({ nome: nome });
  });

  describe(".criar", () => {
    test("Deve criar um setor", () => {
      expect(setor).toBeInstanceOf(Setor);
    });

    test("Deve dar erro ao criar um setor com ID fornecido", () => {
      const nome = "Tecnologia da Informação";
      expect(() => Setor.criar({ nome, id: 1 })).toThrow(
        "Erro ao criar setor: ID não deve ser fornecido.",
      );
    });

    test("Deve dar erro ao criar um setor sem nome", () => {
      expect(() => Setor.criar({} as any)).toThrow(
        "Erro ao criar setor: nome deve ser fornecido.",
      );
    });
  });

  describe(".hidratar", () => {
    test("Deve hidratar um setor", () => {
      const dadosSetor = { nome, id: 1 };

      const setor = Setor.hidratar(dadosSetor);
      expect(setor).toBeInstanceOf(Setor);
    });

    test("Deve dar erro ao hidratar setor com ID não fornecido", () => {
      const dadosSetor = { nome };

      expect(() => Setor.hidratar(dadosSetor)).toThrow(
        "Erro ao hidratar setor: ID deve ser fornecido.",
      );
    });
  });

  describe("getters", () => {
    test("Deve retornar o nome", () => {
      expect(setor.nome).toBeTypeOf("string");
    });
  });

  describe(".atualizar", () => {
    test("Deve atualizar um setor", () => {
      const input = {
        nome: "Novo nome Setor",
      };

      const setorAtualizado = setor.atualizar(input);
      expect(setorAtualizado).toBeInstanceOf(Setor);
    });

    test("Deve dar erro ao não informar um nome", () => {
      const input = {};

      expect(() => setor.atualizar(input)).toThrow(
        "Erro ao atualizar setor: nome deve ser fornecido.",
      );
    });
  });

  describe(".excluir", () => {
    test("Deve excluir um setor", () => {
      setor.excluir();
      expect(setor.excluido_em).toBeInstanceOf(Date);
    });

    test("Deve dar erro se ja tiver excluido", () => {
      setor.excluir();

      expect(() => setor.excluir()).toThrow(
        "Erro ao remove setor: o mesmo já se encontra excluído.",
      );
    });
  });

  describe(".reativar", () => {
    test("Deve reativar um setor com sucesso", () => {
      setor.excluir();
      setor.reativar();
      expect(setor.excluido_em).toBeUndefined();
    });
  });
});
