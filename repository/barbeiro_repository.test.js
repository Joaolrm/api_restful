const barbeiro_repository = require("./barbeiro_repository");

test("Function buscarPorId", () => {
  let barbeiroEsperado = {
    idBarbeiro: 1,
    nomeBarbeiro: "Roger",
  };
  expect(barbeiro_repository.buscarPorId(1)).toEqual(barbeiroEsperado);
});
