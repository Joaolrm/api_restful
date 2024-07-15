const servicoRealizado_service = require("../service/servicoRealizado_service");

function listar(req, res) {
  res.json(servicoRealizado_service.listar());
}

function inserir(req, res) {
  let servicoRealizado = req.body;

  try {
    const servicoRealizadoInserido =
      servicoRealizado_service.inserir(servicoRealizado);
    res.status(201).json(servicoRealizadoInserido);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function buscarPorData(req, res) {
  const data = req.params.data;
  try {
    const servicosRealizadosPorData =
      servicoRealizado_service.buscarPorData(data);
    res.json(servicosRealizadosPorData);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function buscarPorKeyTabela(req, res) {
  const idBarbearia = +req.params.idBarbearia;
  const idBarbeiro = +req.params.idBarbeiro;
  const idServico = +req.params.idServico;
  const dataHoraServico = req.params.dataHoraServico;
  try {
    const servicoRealizadoPorKey = servicoRealizado_service.buscarPorKeyTabela(
      idBarbearia,
      idBarbeiro,
      idServico,
      dataHoraServico
    );
    res.json(servicoRealizadoPorKey);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function atualizar(req, res) {
  const servicoRealizadoAtualizado = req.body;
  const idBarbearia = +req.params.idBarbearia;
  const idBarbeiro = +req.params.idBarbeiro;
  const idServico = +req.params.idServico;
  const dataHoraServico = req.params.dataHoraServico;
  try {
    let servicoRealizadoAlterado = servicoRealizado_service.atualizar(
      idBarbearia,
      idBarbeiro,
      idServico,
      dataHoraServico,
      servicoRealizadoAtualizado
    );
    res.json(servicoRealizadoAlterado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function deletar(req, res) {
  const idBarbearia = +req.params.idBarbearia;
  const idBarbeiro = +req.params.idBarbeiro;
  const idServico = +req.params.idServico;
  const dataHoraServico = req.params.dataHoraServico;
  try {
    const servicoRealizadoDeletado = servicoRealizado_service.deletar(
      idBarbearia,
      idBarbeiro,
      idServico,
      dataHoraServico
    );
    res.json(servicoRealizadoDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

module.exports = {
  listar,
  inserir,
  buscarPorData,
  buscarPorKeyTabela,
  atualizar,
  deletar,
};
