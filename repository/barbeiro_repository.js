let idGenerator = 2;
let listaBarbeiros = [
  {
    idBarbeiro: 1,
    nomeBarbeiro: "Roger",
  },
  {
    idBarbeiro: 2,
    nomeBarbeiro: "João",
  },
];

function buscarPorId(idBarbeiro) {
  for (let barbeiro of listaBarbeiros) {
    if (barbeiro.idBarbeiro === idBarbeiro) {
      return barbeiro;
    }
  }
}

module.exports = {
  buscarPorId,
};
