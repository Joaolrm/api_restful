let idGenerator = 4;
let listaServicos = [
  {
    idServico: 1,
    descricaoServico: "Corte simples",
  },
  {
    idServico: 2,
    descricaoServico: "Sobrancelha",
  },
  {
    idServico: 3,
    descricaoServico: "Corte tesoura",
  },
  {
    idServico: 4,
    descricaoServico: "Corte tesoura + maquina",
  },
];

function buscarPorId(id) {
  for (let servico of listaServicos) {
    if (servico.idServico === id) {
      return servico;
    }
  }
}

module.exports = {
  buscarPorId,
};
