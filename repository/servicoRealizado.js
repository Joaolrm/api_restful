let listaServicosRealizados = [];

let servicoInstance = {
  idServico: 3,
  dataHoraServico: "2024/07/07-19:30",
};
let servicoInstance2 = {
  idServico: 4,
  dataHoraServico: "2024/07/07-20:00",
};
let servicoInstance3 = {
  idServico: 4,
  dataHoraServico: "2024/07/08-19:30",
};

function listar() {
  return listaServicosRealizados;
}

function inserir(servicoRealizado) {
  listaServicosRealizados.push(servicoRealizado);
  return servicoRealizado;
}

function buscarPorData(data) {
  let sevicosRealizadosNaData = [];
  for (let servicoRealizado of listaServicosRealizados) {
    if (servicoRealizado.dataHoraServico.substring(0, 10) == data) {
      sevicosRealizadosNaData.push(servicoRealizado);
    }
  }
  return sevicosRealizadosNaData;
}

function buscarPorKeyTabela(dataHoraMinuto, idServico) {
  for (let servicoRealizado of listaServicosRealizados) {
    if (
      servicoRealizado.dataHoraServico == dataHoraMinuto &&
      servicoRealizado.idServico == idServico
    ) {
      return servicoRealizado;
    }
  }
}

function atualizar(dataHoraMinuto, idServico, servicoRealizadoAlterado) {
  let servicoRealizado = buscarPorKeyTabela(dataHoraMinuto, idServico);
  if (servicoRealizado) {
    servicoRealizado.idServico = servicoRealizadoAlterado.idServico;
    servicoRealizado.dataHoraServico = servicoRealizadoAlterado.dataHoraServico;
  }
  return servicoRealizado;
}

function deletar(dataHoraMinuto, idServico) {
  let servicoRealizado;
  for (let indice in listaServicosRealizados) {
    if (
      listaServicosRealizados[indice].dataHoraServico == dataHoraMinuto &&
      listaServicosRealizados[indice].idServico == idServico
    ) {
      servicoRealizado = listaServicosRealizados.splice(indice, 1)[0];
    }
  }
  return servicoRealizado;
}

