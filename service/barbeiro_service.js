const barbeiroRepository = require('../repository/barbeiro_repository');

exports.listar = () => {
    return barbeiroRepository.listar();
};

exports.adicionarBarbeiro = (nomeBarbeiro, telefone, cpf) => {
    if (barbeiroRepository.buscarPorCpf(cpf)) {
        throw { status: 400, message: "CPF já cadastrado" };
    }
    return barbeiroRepository.adicionarBarbeiro(nomeBarbeiro, telefone, cpf);
};

exports.atualizarBarbeiro = (idBarbeiro, nomeBarbeiro, telefone, cpf) => {
    const barbeiroExistente = barbeiroRepository.buscarPorId(idBarbeiro);
    if (!barbeiroExistente) {
        throw { status: 404, message: "Barbeiro não encontrado" };
    }
    if (cpf !== barbeiroExistente.cpf && barbeiroRepository.buscarPorCpf(cpf)) {
        throw { status: 400, message: "CPF já cadastrado para outro barbeiro" };
    }
    return barbeiroRepository.atualizarBarbeiro(idBarbeiro, nomeBarbeiro, telefone, cpf);
};

exports.buscarPorId = (idBarbeiro) => {
    return barbeiroRepository.buscarPorId(idBarbeiro);
};

exports.deletarBarbeiro = (idBarbeiro) => {
    const barbeiroExistente = barbeiroRepository.buscarPorId(idBarbeiro);
    if (!barbeiroExistente) {
        throw { status: 404, message: "Barbeiro não encontrado" };
    }
    return barbeiroRepository.deletarBarbeiro(idBarbeiro);
};
