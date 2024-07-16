const servico_repository = require("../repository/servico_repository");
const barbeiro_repository = require("../repository/barbeiro_repository");
const barbearia_repository = require("../repository/barbearia_repository");
const servicoRealizado_repository = require("../repository/servicoRealizado_repository");

function listar() {
  return servicoRealizado_repository.listar();
}

function inserir(servicoRealizado) {
  let horarioFuncionamentoBarbearia = {
    abertura: barbearia_repository.buscarPorId(servicoRealizado.idBabearia)
      .horarioAbertura,
    fechamento: barbearia_repository.buscarPorId(servicoRealizado.idBabearia)
      .horarioFechamento,
  };

  let horaMinServicoRealizado = servicoRealizado.dataHoraServico.substring(11);
  if (
    horaMinServicoRealizado > horarioFuncionamentoBarbearia.abertura &&
    horaMinServicoRealizado < horarioFuncionamentoBarbearia.fechamento
  ) {
    if (
      servicoRealizado_repository.buscarPorKeyTabela(
        servicoRealizado.idBabearia,
        servicoRealizado.idBarbeiro,
        servicoRealizado.idServico,
        servicoRealizado.dataHoraServico
      )
    ) {
      throw { id: 400, message: "Serviço já existe" };
    } else {
      if (
        servicoRealizado &&
        servicoRealizado.idBabearia &&
        servicoRealizado.idBarbeiro &&
        servicoRealizado.idServico &&
        servicoRealizado.dataHoraServico &&
        servico_repository.buscarPorId(servicoRealizado.idServico) &&
        barbeiro_repository.buscarPorId(servicoRealizado.idBarbeiro) &&
        barbearia_repository.buscarPorId(servicoRealizado.idBabearia)
      ) {
        return servicoRealizado_repository.inserir(servicoRealizado);
      } else {
        throw {
          id: 400,
          message: "Serviço realizado não possui todos os campos válidos",
        };
      }
    }
  } else {
    throw {
      id: 422,
      message:
        "Serviço realizado não pode ser inserido fora do horário de funcionamento da barbearia",
    };
  }
}

function buscarPorData(data) {
  const servicosRealizados = servicoRealizado_repository.buscarPorData(data);
  if (servicosRealizados.length > 0) {
    return servicosRealizados;
  } else {
    throw { id: 404, message: "Nenhum servico realizado encontrado" };
  }
}

function buscarPorKeyTabela(
  idBabearia,
  idBarbeiro,
  idServico,
  dataHoraServico
) {
  const servicoRealizado = servicoRealizado_repository.buscarPorKeyTabela(
    idBabearia,
    idBarbeiro,
    idServico,
    dataHoraServico
  );
  if (servicoRealizado) {
    return servicoRealizado;
  } else {
    throw { id: 404, message: "Serviço realizado não encontrado" };
  }
}

function atualizar(
  idBabearia,
  idBarbeiro,
  idServico,
  dataHoraServico,
  servicoRealizadoAlterado
) {
  let horarioFuncionamentoBarbearia = {
    abertura: barbearia_repository.buscarPorId(
      servicoRealizadoAlterado.idBabearia
    ).horarioAbertura,
    fechamento: barbearia_repository.buscarPorId(
      servicoRealizadoAlterado.idBabearia
    ).horarioFechamento,
  };

  let horaMinServicoRealizado =
    servicoRealizadoAlterado.dataHoraServico.substring(11);

  if (
    servicoRealizadoAlterado &&
    servicoRealizadoAlterado.idBabearia &&
    servicoRealizadoAlterado.idBarbeiro &&
    servicoRealizadoAlterado.idServico &&
    servicoRealizadoAlterado.dataHoraServico
  ) {
    if (
      servicoRealizado_repository.buscarPorKeyTabela(
        servicoRealizadoAlterado.idBabearia,
        servicoRealizadoAlterado.idBarbeiro,
        servicoRealizadoAlterado.idServico,
        servicoRealizadoAlterado.dataHoraServico
      )
    ) {
      throw {
        id: 400,
        message:
          "Já existe um serviço realizado identico a tentativa de alteração",
      };
    } else {
      if (
        servico_repository.buscarPorId(servicoRealizadoAlterado.idServico) &&
        barbeiro_repository.buscarPorId(servicoRealizadoAlterado.idBarbeiro) &&
        barbearia_repository.buscarPorId(servicoRealizadoAlterado.idBabearia)
      ) {
        if (
          horaMinServicoRealizado > horarioFuncionamentoBarbearia.abertura &&
          horaMinServicoRealizado < horarioFuncionamentoBarbearia.fechamento
        ) {
          servicoRealizadoAlterado = servicoRealizado_repository.atualizar(
            idBabearia,
            idBarbeiro,
            idServico,
            dataHoraServico,
            servicoRealizadoAlterado
          );
          if (servicoRealizadoAlterado) {
            return servicoRealizadoAlterado;
          } else {
            throw { id: 404, message: "Chave composta não localizada" };
          }
        } else {
          throw {
            id: 422,
            message:
              "Serviço realizado não pode ser inserido fora do horário de funcionamento da barbearia",
          };
        }
      } else {
        throw {
          id: 400,
          message:
            "Serviço realizado alterado não possui um id de serviço cadastrado na base",
        };
      }
    }
  }

  throw {
    id: 400,
    message: "Serviço realizado alterado não possui data hora ou id de serviço",
  };
}

function deletar(idBabearia, idBarbeiro, idServico, dataHoraServico) {
  const servicoRealizado = servicoRealizado_repository.deletar(
    idBabearia,
    idBarbeiro,
    idServico,
    dataHoraServico
  );
  if (servicoRealizado) {
    return servicoRealizado;
  } else {
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
