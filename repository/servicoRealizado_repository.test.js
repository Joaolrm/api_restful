const servicoRealizado_repository = require("./servicoRealizado_repository");

test("O metodo listar deve retornar a lista esperada e ter quantidade 3", () => {
  let listaEsperadaDoListar = [
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
    {
      idServico: 2,
      dataHoraServico: "2024/07/08-19:30",
    },
  ];
  expect(servicoRealizado_repository.listar()).toEqual(listaEsperadaDoListar);
  expect(servicoRealizado_repository.listar()).toHaveLength(4);
});

test("Quando inserir um registro do serviço id = 1, para a data 2024/10/07-19:30, devemos encontrar-lo no listar", () => {
  const servicoRealizadoInseridoEsperado = {
    idServico: 1,
    dataHoraServico: "2024/10/07-19:30",
  };

  servicoRealizado_repository.inserir({
    idServico: 1,
    dataHoraServico: "2024/10/07-19:30",
  });

  expect(servicoRealizado_repository.listar()).toContainEqual(
    servicoRealizadoInseridoEsperado
  );
});

test("Quando buscar pela 2024/07/07 data, deve retornar todos os serviços daquela data e ter quantidade de 2", () => {
  let listaEsperadaBuscarPorData = [
    {
      idServico: 3,
      dataHoraServico: "2024/07/07-19:30",
      descricaoServico: "Corte tesoura",
    },
    {
      idServico: 4,
      dataHoraServico: "2024/07/07-20:00",
      descricaoServico: "Corte tesoura + maquina",
    },
  ];

  const resultado = servicoRealizado_repository.buscarPorData("2024/07/07");

  expect(resultado).toEqual(listaEsperadaBuscarPorData);
  expect(resultado).toHaveLength(2);
});

test("Quando buscar pelo momento 2024/07/08-19:30 e idServico = 4, apenas o servicoRealizado para esse momento e nesse serviço", () => {
  let servicoRealizadoEsperado = {
    idServico: 4,
    dataHoraServico: "2024/07/08-19:30",
  };

  const resultado = servicoRealizado_repository.buscarPorKeyTabela(
    "2024/07/08-19:30",
    4
  );

  expect(resultado).toEqual(servicoRealizadoEsperado);
});

test("Quando atualizar o serviço realizado pela data 2024/07/08-19:30 e id 4, ele deve ser econtrado com a função buscarPorKeyTabela e a sua versão anterior não", () => {
  let servicoRealizadoAnterior = {
    idServico: 4,
    dataHoraServico: "2024/07/08-19:30",
  };
  let servicoRealizadoAlterado = {
    idServico: 3,
    dataHoraServico: "2024/07/08-19:30",
  };
  servicoRealizado_repository.atualizar(
    "2024/07/08-19:30",
    4,
    servicoRealizadoAlterado
  );
  expect(
    servicoRealizado_repository.buscarPorKeyTabela(
      servicoRealizadoAlterado.dataHoraServico,
      servicoRealizadoAlterado.idServico
    )
  ).toEqual(servicoRealizadoAlterado);
  expect(
    servicoRealizado_repository.buscarPorKeyTabela(
      servicoRealizadoAnterior.dataHoraServico,
      servicoRealizadoAnterior.idServico
    )
  ).toBeUndefined();
});

test("Quando deletar o serviço realizado, ele não deve mais ser encontrado pela buscarPorKeyTabela", () => {
  let servicoRealizadoDeletar = {
    idServico: 3,
    dataHoraServico: "2024/07/07-19:30",
  };
  expect(
    servicoRealizado_repository.buscarPorKeyTabela(
      servicoRealizadoDeletar.dataHoraServico,
      servicoRealizadoDeletar.idServico
    )
  ).toEqual(servicoRealizadoDeletar);

  servicoRealizado_repository.deletar(
    servicoRealizadoDeletar.dataHoraServico,
    servicoRealizadoDeletar.idServico
  );

  expect(
    servicoRealizado_repository.buscarPorKeyTabela(
      servicoRealizadoDeletar.dataHoraServico,
      servicoRealizadoDeletar.idServico
    )
  ).toBeUndefined();
});
