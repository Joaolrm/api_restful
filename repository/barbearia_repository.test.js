const barbearia_repository = require('./barbearia_repository');


test("Function buscarPorId", () => {
    let barbeariaEsperada = {
        idBarbearia: 1,
        nomeBarbearia: "Barbel"
    };
    expect(barbearia_repository.buscarPorId(1)).toEqual(barbeariaEsperada);
});