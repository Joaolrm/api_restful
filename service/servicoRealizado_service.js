const servico_repository = require('../repository/servico_repository')
const servicoRealizado_repository = require('../repository/servicoRealizado_repository')

function listar() {
    return servicoRealizado_repository.listar();
}

function inserir(servicoRealizado) {
    if (servicoRealizado_repository.buscarPorKeyTabela(servicoRealizado.idBabearia, servicoRealizado.idBarbeiro, servicoRealizado.idServico, servicoRealizado.dataHoraServico)) {
        throw { id: 400, message: "Serviço já existe" };
    }
    else {
        if (servicoRealizado && servicoRealizado.idBabearia && servicoRealizado.idBarbeiro && servicoRealizado.idServico && servicoRealizado.dataHoraServico && servico_repository.buscarPorId(servicoRealizado.idServico)) {
            return servicoRealizado_repository.inserir(servicoRealizado);
        }
        else {
            throw { id: 400, message: "Serviço realizado não possui todos os campos válidos" };
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

function buscarPorKeyTabela(idBabearia, idBarbeiro, idServico, dataHoraServico) {
    const servicoRealizado = servicoRealizado_repository.buscarPorKeyTabela(idBabearia, idBarbeiro, idServico, dataHoraServico);
    if (servicoRealizado) {
        return servicoRealizado;
    }
    else {
        throw { id: 404, message: "Serviço realizado não encontrado" };
    }
}

function atualizar(idBabearia, idBarbeiro, idServico, dataHoraServico, servicoRealizadoAlterado) {
    if (servicoRealizado_repository.buscarPorKeyTabela(servicoRealizadoAlterado.idBabearia, servicoRealizadoAlterado.idBarbeiro, servicoRealizadoAlterado.idServico, servicoRealizadoAlterado.dataHoraServico)) {
        throw { id: 400, message: "Já existe um serviço realizado identico a tentativa de alteração" };
    } else {
        if (servico_repository.buscarPorId(servicoRealizadoAlterado.idServico)) {
            if (servicoRealizadoAlterado && servicoRealizadoAlterado.idBabearia && servicoRealizadoAlterado.idBarbeiro && servicoRealizadoAlterado.idServico && servicoRealizadoAlterado.dataHoraServico) {
                servicoRealizadoAlterado = servicoRealizado_repository.atualizar(idBabearia, idBarbeiro, idServico, dataHoraServico, servicoRealizadoAlterado);
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

}


function deletar(idBabearia, idBarbeiro, idServico, dataHoraServico) {
    const servicoRealizado = servicoRealizado_repository.deletar(idBabearia, idBarbeiro, idServico, dataHoraServico);
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