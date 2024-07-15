const servicoRealizado_service = require("./servicoRealizado_service");

test("Funciton listar", () => {
  let listaDeServicosRealizados = [
    {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-07-19:30",
    },
    {
      idBabearia: 1,
      idBarbeiro: 2,
      idServico: 1,
      dataHoraServico: "2024-07-07-20:00",
    },
    {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-08-19:30",
    },
    {
      idBabearia: 1,
      idBarbeiro: 2,
      idServico: 1,
      dataHoraServico: "2024-07-08-19:30",
    },
  ];
  expect(servicoRealizado_service.listar()).toEqual(listaDeServicosRealizados);
});

test("Function buscarPorKeyTabela", () => {
  let servicoRealizadoEsperado = {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-07-20:00",
  };

  const resultado = servicoRealizado_service.buscarPorKeyTabela(
    1,
    2,
    1,
    "2024-07-07-20:00"
  );

  expect(resultado).toEqual(servicoRealizadoEsperado);

  expect(() =>
    servicoRealizado_service.buscarPorKeyTabela(1, 8, 1, "2024-07-07-20:00")
  ).toThrow();
});

test("Função buscarPorData", () => {
  let servicosRealizadosEsperados = [
    {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-07-19:30",
      descricaoServico: "Corte simples",
      nomeBarbearia: "Barbel",
      nomeBarbeiro: "Roger",
      valorServico: "20,00",
    },
    {
      idBabearia: 1,
      idBarbeiro: 2,
      idServico: 1,
      dataHoraServico: "2024-07-07-20:00",
      descricaoServico: "Corte simples",
      nomeBarbearia: "Barbel",
      nomeBarbeiro: "João",
      valorServico: "20,00",
    },
  ];
  expect(servicoRealizado_service.buscarPorData("2024-07-07")).toEqual(
    servicosRealizadosEsperados
  );
  expect(() => servicoRealizado_service.buscarPorData("2024-07-15")).toThrow();
});

test("Função inserir", () => {
  let casoFuncional = {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-09-09:30",
  };
  let casosFalhos = [
    {
      idBabearia: 1,
      idBarbeiro: 2,
      idServico: 1,
      dataHoraServico: "2024-07-09-09:30",
    },
    {
      idBabearia: 1,
      idBarbeiro: 2,
      idServico: 8,
      dataHoraServico: "2024-07-09-10:30",
    },
    {
      idBabearia: 1,
      idBarbeiro: 2,
      idServico: 1,
    },
    {
      idBabearia: 1,
      idBarbeiro: 2,
      idServico: 1,
      dataHoraServico: "2024-07-09-09:30",
    },
  ];

  servicoRealizado_service.inserir(casoFuncional);
  expect(servicoRealizado_service.listar()).toContainEqual(casoFuncional);

  for (index in casosFalhos) {
    expect(() =>
      servicoRealizado_service.inserir(casosFalhos[index])
    ).toThrow();
  }
});

test("Função atualizar", () => {
  let casoFuncional = {
    servicoAAtualizar: {
      idBabearia: 1,
      idBarbeiro: 2,
      idServico: 1,
      dataHoraServico: "2024-07-07-20:00",
    },
    servicoAtualizado: {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-07-19:40",
    },
  };

  servicoRealizado_service.atualizar(
    casoFuncional.servicoAAtualizar.idBabearia,
    casoFuncional.servicoAAtualizar.idBarbeiro,
    casoFuncional.servicoAAtualizar.idServico,
    casoFuncional.servicoAAtualizar.dataHoraServico,
    casoFuncional.servicoAtualizado
  );

  expect(
    servicoRealizado_service.buscarPorKeyTabela(
      casoFuncional.servicoAtualizado.idBabearia,
      casoFuncional.servicoAtualizado.idBarbeiro,
      casoFuncional.servicoAtualizado.idServico,
      casoFuncional.servicoAtualizado.dataHoraServico
    )
  ).toEqual(casoFuncional.servicoAtualizado);

  let casoFalho = {
    servicoAAtualizar: {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-07-19:30",
    },
    servicoAtualizado: {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-07-19:40",
    },
  };

  expect(() =>
    servicoRealizado_service.atualizar(
      casoFalho.servicoAAtualizar.idBabearia,
      casoFalho.servicoAAtualizar.idBarbeiro,
      casoFalho.servicoAAtualizar.idServico,
      casoFalho.servicoAAtualizar.dataHoraServico,
      casoFalho.servicoAtualizado
    )
  ).toThrow();

  let casoFalho2 = {
    servicoAAtualizar: {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2025-07-07-19:30",
    },
    servicoAtualizado: {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2025-07-07-19:40",
    },
  };

  expect(() =>
    servicoRealizado_service.atualizar(
      casoFalho2.servicoAAtualizar.idBabearia,
      casoFalho2.servicoAAtualizar.idBarbeiro,
      casoFalho2.servicoAAtualizar.idServico,
      casoFalho2.servicoAAtualizar.dataHoraServico,
      casoFalho2.servicoAtualizado
    )
  ).toThrow();

  let casoFalho3 = {
    servicoAAtualizar: {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-08-19:30",
    },
    servicoAtualizado: {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 18,
      dataHoraServico: "2026-07-07-19:40",
    },
  };

  expect(() =>
    servicoRealizado_service.atualizar(
      casoFalho3.servicoAAtualizar.idBabearia,
      casoFalho3.servicoAAtualizar.idBarbeiro,
      casoFalho3.servicoAAtualizar.idServico,
      casoFalho3.servicoAAtualizar.dataHoraServico,
      casoFalho3.servicoAtualizado
    )
  ).toThrow();

  let casoFalho4 = {
    servicoAAtualizar: {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
      dataHoraServico: "2024-07-08-19:30",
    },
    servicoAtualizado: {
      idBabearia: 1,
      idBarbeiro: 1,
      idServico: 1,
    },
  };

  expect(() =>
    servicoRealizado_service.atualizar(
      casoFalho4.servicoAAtualizar.idBabearia,
      casoFalho4.servicoAAtualizar.idBarbeiro,
      casoFalho4.servicoAAtualizar.idServico,
      casoFalho4.servicoAAtualizar.dataHoraServico,
      casoFalho4.servicoAtualizado
    )
  ).toThrow();
});

test("Function deletar", () => {
  let casoFuncional = {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-09-09:30",
  };

  servicoRealizado_service.deletar(
    casoFuncional.idBabearia,
    casoFuncional.idBarbeiro,
    casoFuncional.idServico,
    casoFuncional.dataHoraServico
  );

  expect(() =>
    servicoRealizado_service.buscarPorKeyTabela(
      casoFuncional.idBabearia,
      casoFuncional.idBarbeiro,
      casoFuncional.idServico,
      casoFuncional.dataHoraServico
    )
  ).toThrow();

  let casoFalho = {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 8,
    dataHoraServico: "2024-07-09-09:30",
  };
  expect(() =>
    servicoRealizado_service.deletar(
      casoFalho.idBabearia,
      casoFalho.idBarbeiro,
      casoFalho.idServico,
      casoFalho.dataHoraServico
    )
  ).toThrow();
});
