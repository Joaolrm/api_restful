const express = require('express');
const router = express.Router();

const barbeiro_controller = require('../controller/barbeiro_controller');

router.get("/", barbeiro_controller.listar);
router.post("/", barbeiro_controller.inserir);
router.put("/:idBarbeiro", barbeiro_controller.atualizar);
router.get("/:idBarbeiro", barbeiro_controller.buscarPorId);
router.delete("/:idBarbeiro", barbeiro_controller.deletar);

module.exports = router;
