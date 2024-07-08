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
    {
      idServico: 2,
      dataHoraServico: "2024/07/08-19:30",
    },
  ];
  expect(servicoRealizado_service.listar()).toEqual(listaDeServicosRealizados);
});

test("Function buscarPorKeyTabela", () => {
  expect((() => servicoRealizado_service.buscarPorKeyTabela("2024/07/08-22:30", 4))).toThrow();
});

test("Função buscarPorData", () => {
  let servicosRealizadosEsperados = [
    {
      idServico: 3,
      dataHoraServico: "2024/07/07-19:30",
      descricaoServico: "Corte tesoura",
    },
    {
      idServico: 4,
      dataHoraServico: "2024/07/07-20:00",
      descricaoServico: "Corte tesoura + maquina",
    }
  ];
  expect(servicoRealizado_service.buscarPorData("2024/07/07")).toEqual(servicosRealizadosEsperados);
  expect(() => servicoRealizado_service.buscarPorData("2024/07/15")).toThrow();
});

test("Função inserir, deve inserir somente quando todos valores forem preenchidos e tiver um serviço valido, o seu resultado deve ser encontrado no método listar, se não for inserido, o metodo não deve ter retorno", () => {
  let casoFuncional = {
    idServico: 1,
    dataHoraServico: "2024/07/07-19:30",
  };
  let casosFalhos = [{
    idServico: 8,
    dataHoraServico: "2024/07/07-19:30",
  },
  {
    idServico: 1,
  },
  {
    dataHoraServico: "2024/07/07-19:30",
  }];

  servicoRealizado_service.inserir(casoFuncional);
  expect(servicoRealizado_service.listar()).toContainEqual(casoFuncional);

  for (index in casosFalhos) {
    expect(() => servicoRealizado_service.inserir(casosFalhos[index])).toThrow();
  };


});

test("Função atualizar", () => {
  let casoFuncional = {
    servicoAAtualizar: {
      idServico: 3,
      dataHoraServico: "2024/07/07-19:30"
    },
    servicoAtualizado: {
      idServico: 3,
      dataHoraServico: "2024/07/07-19:35"
    }
  };

  servicoRealizado_service.atualizar(casoFuncional.servicoAAtualizar.dataHoraServico, casoFuncional.servicoAAtualizar.idServico, casoFuncional.servicoAtualizado);

  expect(servicoRealizado_service.buscarPorKeyTabela(casoFuncional.servicoAtualizado.dataHoraServico, casoFuncional.servicoAtualizado.idServico)).toEqual(casoFuncional.servicoAtualizado);

  let casoFalho = {
    servicoAAtualizar: {
      idServico: 4,
      dataHoraServico: "2024/07/08-19:38",
    },
    servicoAtualizado: {
      idServico: 3,
      dataHoraServico: "2024/07/07-19:35"
    }
  };

  expect(() => servicoRealizado_service.atualizar(casoFalho.servicoAAtualizar.dataHoraServico, casoFalho.servicoAAtualizar.idServico, casoFalho.servicoAtualizado)).toThrow();

  let casoFalho2 = {
    servicoAAtualizar: {
      idServico: 4,
      dataHoraServico: "2024/07/08-19:30",
    },
    servicoAtualizado: {
      idServico: 13,
      dataHoraServico: "2024/07/07-19:35"
    }
  };

  expect(() => servicoRealizado_service.atualizar(casoFalho2.servicoAAtualizar.dataHoraServico, casoFalho2.servicoAAtualizar.idServico, casoFalho2.servicoAtualizado)).toThrow();

  let casoFalho3 = {
    servicoAAtualizar: {
      idServico: 4,
      dataHoraServico: "2024/07/08-19:30",
    },
    servicoAtualizado: {
      idServico: 4,
    }
  };

  expect(() => servicoRealizado_service.atualizar(casoFalho3.servicoAAtualizar.dataHoraServico, casoFalho3.servicoAAtualizar.idServico, casoFalho3.servicoAtualizado)).toThrow();

  let casoFalho4 = {
    servicoAAtualizar: {
      idServico: 4,
      dataHoraServico: "2024/07/08-22:30",
    },
    servicoAtualizado: {
      idServico: 4,
      dataHoraServico: "2024/07/08-19:30"
    }
  };

  expect(() => servicoRealizado_service.atualizar(casoFalho4.servicoAAtualizar.dataHoraServico, casoFalho4.servicoAAtualizar.idServico, casoFalho4.servicoAtualizado)).toThrow();



});

test("Function deletar", () => {
  let casoFuncional = {
    idServico: 2,
    dataHoraServico: "2024/07/08-19:30",
  }

  servicoRealizado_service.deletar(casoFuncional.dataHoraServico, casoFuncional.idServico);

  expect(() => servicoRealizado_service.buscarPorKeyTabela(casoFuncional.idServico, casoFuncional.dataHoraServico)).toThrow();

  let casoFalho = {
    idServico: 8,
    dataHoraServico: "2024/07/08-19:30",
  }
  expect(() => servicoRealizado_service.deletar(casoFalho.dataHoraServico, casoFalho.idServico)).toThrow();
});
