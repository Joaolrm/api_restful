const servicoRealizado_service = require("./servicoRealizado_service");

test("Função listar deve retornar toda a lista", () => {
  let listaDeServicosRealizados = [
    {
      idServico: 3,
      dataHoraServico: "2024/07/07-19:30",
    },
    {
      idServico: 4,
      dataHoraServico: "2024/07/07-20:00",
    },
    {
      idServico: 4,
      dataHoraServico: "2024/07/08-19:30",
    },
  ];
  expect(servicoRealizado_service.listar()).toEqual(listaDeServicosRealizados);
});
