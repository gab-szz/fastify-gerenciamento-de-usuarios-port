import { expect, test } from "vitest";
import { Setor } from "./setor.domain.js";
import { id } from "zod/locales";

test("Deve criar um setor", () => {
  const nome = "Tecnologia da Informação";
  const setor = Setor.criar({ nome });
  expect(setor).toBeInstanceOf(Setor);
});

test("Deve dar erro ao criar um setor com ID fornecido", () => {
  const nome = "Tecnologia da Informação";
  expect(() => Setor.criar({ nome, id: 1 })).toThrow(
    "Erro ao criar setor: ID não deve ser fornecido.",
  );
});

test("Deve hidratar um setor", () => {
  const nome = "Tecnologia da Informação";
  const dadosSetor = { nome, id: 1 };

  const setor = Setor.hidratar(dadosSetor);
  expect(setor).toBeInstanceOf(Setor);
});

test("Deve dar erro ao hidratar setor com ID não fornecido", () => {
  const nome = "Tecnologia da Informação";
  const dadosSetor = { nome };

  expect(() => Setor.hidratar(dadosSetor)).toThrow(
    "Erro ao hidratar setor: ID deve ser fornecido.",
  );
});
