const barbearia_repository = require("./barbearia_repository");

test("Function buscarPorId", () => {
  let barbeariaEsperada = {
    idBarbearia: 1,
    nomeBarbearia: "Barbel",
    cnpj: "99.777.777/0001-66",
    horarioAbertura: "08:00",
    horarioFechamento: "18:00",
  };
  expect(barbearia_repository.buscarPorId(1)).toEqual(barbeariaEsperada);
});
