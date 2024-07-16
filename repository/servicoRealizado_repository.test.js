const servicoRealizado_repository = require("./servicoRealizado_repository");

test("Function listar", () => {
  let listaEsperadaDoListar = [
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
  expect(servicoRealizado_repository.listar()).toEqual(listaEsperadaDoListar);
  expect(servicoRealizado_repository.listar()).toHaveLength(4);
});

test("Function buscarPorData", () => {
  let listaEsperadaBuscarPorData = [
    {
      barbearia: {
        idBabearia: 1,
        nomeBarbearia: "Barbel",
      },
      barbeiro: {
        idBarbeiro: 1,
        nomeBarbeiro: "Roger",
      },
      servico: {
        idServico: 1,
        dataHoraServico: "2024-07-07-19:30",
        descricaoServico: "Corte simples",
        valorServico: "20,00",
      },
    },
    {
      barbearia: {
        idBabearia: 1,
        nomeBarbearia: "Barbel",
      },
      barbeiro: {
        idBarbeiro: 2,
        nomeBarbeiro: "João",
      },
      servico: {
        idServico: 1,
        dataHoraServico: "2024-07-07-20:00",
        descricaoServico: "Corte simples",
        valorServico: "20,00",
      },
    },
  ];

  const resultado = servicoRealizado_repository.buscarPorData("2024-07-07");

  expect(resultado).toEqual(listaEsperadaBuscarPorData);
  expect(resultado).toHaveLength(2);
});

test("Function buscarPorKeyTabela", () => {
  let servicoRealizadoEsperado = {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-07-20:00",
  };

  const resultado = servicoRealizado_repository.buscarPorKeyTabela(
    1,
    2,
    1,
    "2024-07-07-20:00"
  );

  expect(resultado).toEqual(servicoRealizadoEsperado);
});

test("Function atualizar", () => {
  let servicoRealizadoAnterior = {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-07-20:00",
  };
  let servicoRealizadoAlterado = {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-07-20:30",
  };
  servicoRealizado_repository.atualizar(
    servicoRealizadoAnterior.idBabearia,
    servicoRealizadoAnterior.idBarbeiro,
    servicoRealizadoAnterior.idServico,
    servicoRealizadoAnterior.dataHoraServico,
    servicoRealizadoAlterado
  );
  expect(
    servicoRealizado_repository.buscarPorKeyTabela(
      servicoRealizadoAlterado.idBabearia,
      servicoRealizadoAlterado.idBarbeiro,
      servicoRealizadoAlterado.idServico,
      servicoRealizadoAlterado.dataHoraServico
    )
  ).toEqual(servicoRealizadoAlterado);
  expect(
    servicoRealizado_repository.buscarPorKeyTabela(
      servicoRealizadoAnterior.idBabearia,
      servicoRealizadoAnterior.idBarbeiro,
      servicoRealizadoAnterior.idServico,
      servicoRealizadoAnterior.dataHoraServico
    )
  ).toBeUndefined();
});

test("Function inserir", () => {
  const servicoRealizadoInseridoEsperado = {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-09-09:30",
  };

  servicoRealizado_repository.inserir(servicoRealizadoInseridoEsperado);

  expect(servicoRealizado_repository.listar()).toContainEqual(
    servicoRealizadoInseridoEsperado
  );
});

test("Function deletar", () => {
  let servicoRealizadoDeletar = {
    idBabearia: 1,
    idBarbeiro: 2,
    idServico: 1,
    dataHoraServico: "2024-07-09-09:30",
  };

  expect(
    servicoRealizado_repository.buscarPorKeyTabela(
      servicoRealizadoDeletar.idBabearia,
      servicoRealizadoDeletar.idBarbeiro,
      servicoRealizadoDeletar.idServico,
      servicoRealizadoDeletar.dataHoraServico
    )
  ).toEqual(servicoRealizadoDeletar);

  servicoRealizado_repository.deletar(
    servicoRealizadoDeletar.idBabearia,
    servicoRealizadoDeletar.idBarbeiro,
    servicoRealizadoDeletar.idServico,
    servicoRealizadoDeletar.dataHoraServico
  );

  expect(
    servicoRealizado_repository.buscarPorKeyTabela(
      servicoRealizadoDeletar.idBabearia,
      servicoRealizadoDeletar.idBarbeiro,
      servicoRealizadoDeletar.idServico,
      servicoRealizadoDeletar.dataHoraServico
    )
  ).toBeUndefined();
});
