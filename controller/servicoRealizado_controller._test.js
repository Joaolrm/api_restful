const servicoRealizado_controller = require('./servicoRealizado_controller')

test("Function listar", () => {
    let listaServicosRealizados = [
        {
          idServico: 3,
          dataHoraServico: "2024-07-07-19:30",
        },
        {
          idServico: 4,
          dataHoraServico: "2024-07-07-20:00",
        },
        {
          idServico: 4,
          dataHoraServico: "2024-07-08-19:30",
        },
        {
          idServico: 2,
          dataHoraServico: "2024-07-08-19:30",
        },
      ];

    expect(servicoRealizado_controller.listar()).toEqual(listaServicosRealizados);
});

test("Function inserir", () => { });
test("Function buscarPorData", () => { });
test("Function buscarPorKeyTabela", () => { });
test("Function atualizar", () => { });
test("Function deletar", () => { });
