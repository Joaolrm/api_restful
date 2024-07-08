const servico_repository = require('./servico_repository')
let listaServicosRealizados = [
  {
    idServico: 3,
    dataHoraServico: "2024/07/07-19:30",
  },
  {
    idServico: 4,
    dataHoraServico: "2024/07/07-20:00",
  },
  {
    idServico: 4,
    dataHoraServico: "2024/07/08-19:30",
  },
  {
    idServico: 2,
    dataHoraServico: "2024/07/08-19:30",
  },
];

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
      let descricaoServico = servico_repository.buscarPorId(servicoRealizado.idServico)
      let servicoRealizadoCopy = { ...servicoRealizado };
      servicoRealizadoCopy.descricaoServico = descricaoServico.descricaoServico;
      sevicosRealizadosNaData.push(servicoRealizadoCopy);
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


module.exports = {
  listar,
  inserir,
  atualizar,
  deletar,
  buscarPorKeyTabela,
  buscarPorData,
};
