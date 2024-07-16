const express = require("express");
const app = express();
const PORTA = 3000;

const loginController = require("./controller/login_controller");
const servicoRealizado_rotas = require("./rotas/servicoRealizado_rotas");
const middlewareAcesso = require("./middleware/acesso_middleware");

app.use(express.json());

// Middleware para logging
app.use((req, res, next) => {
  console.log(req.method + " " + req.originalUrl);
  next();
});

// Rota para login
app.post("/api/login", loginController.realizarLogin);

// Rotas protegidas pelo middleware de acesso
app.use(
  "/api/servicoRealizado",
  middlewareAcesso.verificarAcesso,
  servicoRealizado_rotas
);

app.listen(PORTA, () => {
  console.log("Iniciando o servidor na porta " + PORTA);
});
