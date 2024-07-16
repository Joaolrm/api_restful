const express = require("express");
const app = express();
const PORTA = 3000;

const loginController = require("./controller/login_controller");
const servicoRealizado_rotas = require("./rotas/servicoRealizado_rotas");
const barbeiro_rotas = require("./rotas/barbeiro_router");
const middlewareAcesso = require("./middleware/acesso_middleware");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method + " " + req.originalUrl);
  next();
});

app.post("/api/login", loginController.realizarLogin);

app.use(
  "/api/servicoRealizado",
  middlewareAcesso.verificarAcesso,
  servicoRealizado_rotas
);

app.use(
  "/api/barbeiro",
  middlewareAcesso.verificarAcesso,
  barbeiro_rotas
);

app.listen(PORTA, () => {
  console.log("Iniciando o servidor na porta " + PORTA);
});