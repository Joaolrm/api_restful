let listaValorServico = [
  {
    idBabearia: 1,
    idBarbeiro: 1,
    idServico: 1,
    valorServico: "20,00",
  },
  {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    valorServico: "20,00",
  },
  {
    idBabearia: 2,
    idBarbeiro: 1,
    idServico: 1,
    valorServico: "20,00",
  },
  {
    idBabearia: 2,
    idBarbeiro: 2,
    idServico: 1,
    valorServico: "20,00",
  },
];

function buscarPorKeyTabela(idBabearia, idBarbeiro, idServico) {
  for (let valorServico of listaValorServico) {
    if (
      valorServico.idBabearia == idBabearia &&
      valorServico.idBarbeiro == idBarbeiro &&
      valorServico.idServico == idServico
    ) {
      return valorServico;
    }
  }
}

module.exports = {
  buscarPorKeyTabela,
};
