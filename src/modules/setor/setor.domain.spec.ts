import { expect, test } from "vitest";
import { Setor } from "./setor.domain.js";

test("Deve criar um setor", () => {
  const nome = "Tecnologia da Informação";
  const setor = Setor.criar({ nome });
  expect(setor).toBeInstanceOf(Setor);
});

test("Deve hidratar um setor", () => {
  const nome = "Tecnologia da Informação";
  const dadosSetor = { nome };

  const setor = Setor.hidratar(dadosSetor);
  expect(setor).toBeInstanceOf(Setor);
});
