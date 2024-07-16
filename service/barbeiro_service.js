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

function atualizarBarbeiro(id, nomeBarbeiro, telefone, cpf) {
    const barbeiroExistente = barbeiro_repository.buscarPorId(id);
    if (!barbeiroExistente) {
        throw { status: 404, message: "Barbeiro não encontrado" };
    }
    if (cpf !== barbeiroExistente.cpf && barbeiro_repository.buscarPorCpf(cpf)) {
        throw { status: 400, message: "CPF já cadastrado para outro barbeiro" };
    }
    return barbeiro_repository.atualizarBarbeiro(id, nomeBarbeiro, telefone, cpf);
}

function deletarBarbeiro(id) {
    const barbeiroDeletado = barbeiro_repository.deletarBarbeiro(id);
    if (!barbeiroDeletado) {
        throw { status: 404, message: "Barbeiro não encontrado" };
    }
    return barbeiroDeletado;
}

module.exports = {
    listar,
    adicionarBarbeiro,
    atualizarBarbeiro,
    deletarBarbeiro
};
