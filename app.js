const express = require("express");
const app = express();
const PORTA = 3000;

const loginController = require("./controller/login_controller");
const servicoRealizado_rotas = require("./rotas/servicoRealizado_rotas");
const barbeiro_rotas = require("./rotas/barbeiro_router");  // Corrigido para barbeiro_router
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

// Rotas de barbeiros
app.use(
  "/api/barbeiros",
  middlewareAcesso.verificarAcesso,
  barbeiro_rotas
);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORTA, () => {
  console.log("Iniciando o servidor na porta " + PORTA);
});
