const produtoService = require('../service/produto_service');

function listar(req, res) {
    res.json(produtoService.listar());
}

function inserir(req, res) {
    let produto = req.body;
    
    try {
        const produtoInserido = produtoService.inserir(produto);
        res.status(201).json(produtoInserido);
    } 
    catch (err) {
        res.status(err.id).json(err);
    }    
}

function buscarPorId(req, res) {
    const id = +req.params.id;    
    try{
        const produtoComId = produtoService.buscarPorId(id);
        res.json(produtoComId);
    }
    catch(err) {
        res.status(err.id).json(err);
    }        
}

function atualizar(req, res) {
    let produto = req.body;
    const id = +req.params.id;
    try {
        const produtoAtualizado = produtoService.atualizar(id, produto);
        res.json(produtoAtualizado)
    }
    catch(err) {
        res.status(err.id).json(err);
    }
}

function deletar(req, res){
    const id = +req.params.id;
    try {
        const produtoDeletado = produtoService.deletar(id);
        res.json(produtoDeletado);        
    }
    catch(err) {
        res.status(err.id).json(err);
    }        
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}