let idGenerator = 2;
let listaBarbeiros = [
    {
        idBarbeiro: 1,
        nomeBarbeiro: "Roger",
        telefone: "123456789",
        cpf: "123.456.789-00"
    },
    {
        idBarbeiro: 2,
        nomeBarbeiro: "João",
        telefone: "987654321",
        cpf: "987.654.321-00"
    }
];

function buscarPorId(idBarbeiro) {
    return listaBarbeiros.find(barbeiro => barbeiro.idBarbeiro === idBarbeiro);
}

function adicionarBarbeiro(nomeBarbeiro, telefone, cpf) {
    const novoBarbeiro = {
        idBarbeiro: ++idGenerator,
        nomeBarbeiro,
        telefone,
        cpf
    };
    listaBarbeiros.push(novoBarbeiro);
    return novoBarbeiro;
}

function atualizarBarbeiro(idBarbeiro, nomeBarbeiro, telefone, cpf) {
    const barbeiro = listaBarbeiros.find(barbeiro => barbeiro.idBarbeiro === idBarbeiro);
    if (barbeiro) {
        barbeiro.nomeBarbeiro = nomeBarbeiro;
        barbeiro.telefone = telefone;
        barbeiro.cpf = cpf;
        return barbeiro;
    }
    return null;
}

function deletarBarbeiro(idBarbeiro) {
    const index = listaBarbeiros.findIndex(barbeiro => barbeiro.idBarbeiro === idBarbeiro);
    if (index !== -1) {
        return listaBarbeiros.splice(index, 1)[0];
    }
    return null;
}

module.exports = {
    buscarPorId,
    adicionarBarbeiro,
    atualizarBarbeiro,
    deletarBarbeiro
};
