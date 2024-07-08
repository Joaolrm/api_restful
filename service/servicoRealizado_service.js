const servico_repository = require('../repository/servico_repository')
const servicoRealizado_repository = require('../repository/servicoRealizado_repository')

function listar() {
    return servicoRealizado_repository.listar();
}

function inserir(servicoRealizado) {
    if (servicoRealizado_repository.buscarPorKeyTabela(servicoRealizado.dataHoraServico, servicoRealizado.idServico)) {
        throw { id: 400, message: "Serviço já existe" };
    }
    else {
        if (servicoRealizado && servicoRealizado.idServico && servicoRealizado.dataHoraServico && servico_repository.buscarPorId(servicoRealizado.idServico)) {
            return servicoRealizado_repository.inserir(servicoRealizado);
        }
        else {
            throw { id: 400, message: "Serviço realizado não possui um id de serviço ou uma data válida" };
        }
    }
}

function buscarPorData(data) {
    const servicosRealizados = servicoRealizado_repository.buscarPorData(data);
    if (servicosRealizados.length > 0) {
        return servicosRealizados;
    }
    else {
        throw { id: 404, message: "Nenhum servico realizado encontrado" };
    }
}

function buscarPorKeyTabela(dataHoraServico, idServico) {
    const servicoRealizado = servicoRealizado_repository.buscarPorKeyTabela(dataHoraServico, idServico);
    if (servicoRealizado) {
        return servicoRealizado;
    }
    else {
        throw { id: 404, message: "Serviço realizado não encontrado" };
    }
}

function atualizar(dataHoraServico, idServico, servicoRealizadoAlterado) {
    if (servico_repository.buscarPorId(servicoRealizadoAlterado.idServico)) {
        if (servicoRealizadoAlterado && servicoRealizadoAlterado.idServico && servicoRealizadoAlterado.dataHoraServico) {
            servicoRealizadoAlterado = servicoRealizado_repository.atualizar(dataHoraServico, idServico, servicoRealizadoAlterado);
            if (servicoRealizadoAlterado) {
                return servicoRealizadoAlterado;
            }
            else {
                throw { id: 404, message: "Chave composta não localizada" };
            }
        }
        else {
            throw { id: 400, message: "Serviço realizado alterado não possui data hora ou id de serviço" };
        }
    } else {
        throw { id: 400, message: "Serviço realizado alterado não possui um id de serviço cadastrado na base" };
    }
}

function deletar(dataHoraMinuto, idServico) {
    const servicoRealizado = servicoRealizado_repository.deletar(dataHoraMinuto, idServico);
    if (servicoRealizado) {
        return servicoRealizado;
    }
    else {
        throw { id: 404, message: "Serviço realizado não encontrado" };
    }
}

module.exports = {
    listar,
    inserir,
    atualizar,
    deletar,
    buscarPorKeyTabela,
    buscarPorData,
};