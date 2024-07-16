const barbeiro_repository = require('./barbeiro_repository');

test("Function buscarPorId", () => {
    let barbeiroEsperado = {
        idBarbeiro: 1,
        nomeBarbeiro: "Roger",
        cpf: "123.456.789-00",
        telefone: "123456789"
    };
    expect(barbeiro_repository.buscarPorId(1)).toEqual(barbeiroEsperado);
});

test("Function adicionarBarbeiro", () => {
    let novoBarbeiro = barbeiro_repository.adicionarBarbeiro("Carlos");
    expect(novoBarbeiro).toHaveProperty("idBarbeiro");
    expect(novoBarbeiro).toHaveProperty("nomeBarbeiro", "Carlos");
    expect(barbeiro_repository.buscarPorId(novoBarbeiro.idBarbeiro)).toEqual(novoBarbeiro);
});

test("Function atualizarBarbeiro", () => {
    let barbeiroAtualizado = barbeiro_repository.atualizarBarbeiro(1, "Rogério");
    expect(barbeiroAtualizado).toHaveProperty("idBarbeiro", 1);
    expect(barbeiroAtualizado).toHaveProperty("nomeBarbeiro", "Rogério");
    expect(barbeiro_repository.buscarPorId(1)).toEqual(barbeiroAtualizado);
});

test("Function atualizarBarbeiro returns null if barber not found", () => {
    expect(barbeiro_repository.atualizarBarbeiro(999, "Nome Inexistente")).toBeNull();
});

test("Function deletarBarbeiro", () => {
    let barbeiroDeletado = barbeiro_repository.deletarBarbeiro(2);
    expect(barbeiroDeletado).toHaveProperty("idBarbeiro", 2);
    expect(barbeiroDeletado).toHaveProperty("nomeBarbeiro", "João");
    expect(barbeiro_repository.buscarPorId(2)).toBeUndefined();
});

test("Function deletarBarbeiro returns null if barber not found", () => {
    expect(barbeiro_repository.deletarBarbeiro(999)).toBeNull();
});
