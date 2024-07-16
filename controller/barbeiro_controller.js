const barbeiroService = require('../service/barbeiro_service');

exports.listar = (req, res) => {
    try {
        const barbeiros = barbeiroService.listar();
        res.status(200).json(barbeiros);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar barbeiros", error });
    }
};

exports.inserir = (req, res) => {
    try {
        const { nomeBarbeiro, telefone, cpf } = req.body;
        const novoBarbeiro = barbeiroService.adicionarBarbeiro(nomeBarbeiro, telefone, cpf);
        res.status(201).json(novoBarbeiro);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

exports.atualizar = (req, res) => {
    try {
        const { idBarbeiro } = req.params;
        const { nomeBarbeiro, telefone, cpf } = req.body;
        const barbeiroAtualizado = barbeiroService.atualizarBarbeiro(parseInt(idBarbeiro), nomeBarbeiro, telefone, cpf);
        res.status(200).json(barbeiroAtualizado);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

exports.buscarPorId = (req, res) => {
    try {
        const { idBarbeiro } = req.params;
        const barbeiro = barbeiroService.buscarPorId(parseInt(idBarbeiro));
        if (barbeiro) {
            res.status(200).json(barbeiro);
        } else {
            res.status(404).json({ message: "Barbeiro não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar barbeiro", error });
    }
};

exports.deletar = (req, res) => {
    try {
        const { idBarbeiro } = req.params;
        const barbeiroDeletado = barbeiroService.deletarBarbeiro(parseInt(idBarbeiro));
        if (barbeiroDeletado) {
            res.status(200).json(barbeiroDeletado);
        } else {
            res.status(404).json({ message: "Barbeiro não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar barbeiro", error });
    }
};
