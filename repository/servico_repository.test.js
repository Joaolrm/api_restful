const servico_repository = require('./servico_repository');


test("buscarPorId deve retornar o serviço daquele id", () => {
    let servicoEsperado = {
        idServico: 1,
        descricaoServico: "Corte simples",
    };
    expect(servico_repository.buscarPorId(1)).toEqual(servicoEsperado);
});