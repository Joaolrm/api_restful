const servicoRealizado_repository = require('../repository/servicoRealizado_repository')

function listar() {
    return servicoRealizado_repository.listar();
}

module.exports = {
    listar,
}