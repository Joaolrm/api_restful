let idGenerator = 2;
let listaBarbearias = [
  {
    idBarbearia: 1,
    nomeBarbearia: "Barbel",
  },
  {
    idBarbearia: 2,
    nomeBarbearia: "Barbearia genérica 2",
  },
];

function buscarPorId(idBarbearia) {
  for (let barbearia of listaBarbearias) {
    if (barbearia.idBarbearia === idBarbearia) {
      return barbearia;
    }
  }
}

module.exports = {
  buscarPorId,
};
