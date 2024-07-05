const produtoRepository = require('../repository/produto_repository')

function listar() {
    return produtoRepository.listar();
}

function inserir(produto) {
    if(produto && produto.nome && produto.preco) {// produto != undefined
        return produtoRepository.inserir(produto);
    }
    else {
        throw {id:400, message:"Produto nao possui nome ou preco"};
    }
}

function buscarPorId(id) {
    const produto = produtoRepository.buscarPorId(id);
    if(produto) {
        return produto;
    }
    else {
        throw {id:404, message:"Produto nao encontrado"};
    }
}

function atualizar(id, produto) { 
    if(produto && produto.nome && produto.preco) {// produto != undefined
        const produtoAtualizado =  produtoRepository.atualizar(id,produto);
        if(produtoAtualizado) {
            return produtoAtualizado;
        }
        else {
            throw {id:404, message:"Produto nao encontrado"};
        }    
    }
    else {
        throw {id:400, message:"Produto nao possui nome ou preco"};
    }

}

function deletar(id) {
    const produto = produtoRepository.deletar(id);
    if(produto) {
        return produto;
    }
    else {
        throw {id:404, message:"Produto nao encontrado"};
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}