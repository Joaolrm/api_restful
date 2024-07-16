const barbeiro_repository = require('../repository/barbeiro_repository');

function listar() {
    return barbeiro_repository.listar();
}

function adicionarBarbeiro(nomeBarbeiro, telefone, cpf) {
    if (barbeiro_repository.buscarPorCpf(cpf)) {
        throw { status: 400, message: "CPF já cadastrado" };
    }

    return barbeiro_repository.adicionarBarbeiro(nomeBarbeiro, telefone, cpf);
}

function atualizarBarbeiro(idBarbeiro, nomeBarbeiro, telefone, cpf) {
    const barbeiroExistente = barbeiro_repository.buscarPorId(idBarbeiro);
    if (!barbeiroExistente) {
        throw { status: 404, message: "Barbeiro não encontrado" };
    }

    if (cpf !== barbeiroExistente.cpf && barbeiro_repository.buscarPorCpf(cpf)) {
        throw { status: 400, message: "CPF já cadastrado para outro barbeiro" };
    }

    return barbeiro_repository.atualizarBarbeiro(idBarbeiro, nomeBarbeiro, telefone, cpf);
}

function deletarBarbeiro(idBarbeiro) {
    const barbeiroExistente = barbeiro_repository.buscarPorId(idBarbeiro);
    if (!barbeiroExistente) {
        throw { status: 404, message: "Barbeiro não encontrado" };
    }

    return barbeiro_repository.deletarBarbeiro(idBarbeiro);
}

module.exports = {
    listar,
    adicionarBarbeiro,
    atualizarBarbeiro,
    deletarBarbeiro
};
