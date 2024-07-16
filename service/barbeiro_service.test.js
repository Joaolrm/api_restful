const barbeiroService = require('../service/barbeiro_service');
const barbeiro_repository = require('../repository/barbeiro_repository');

jest.mock('../repository/barbeiro_repository');

beforeEach(() => {
  
  jest.clearAllMocks();
});

test('Adicionar um novo barbeiro', () => {
  barbeiro_repository.buscarPorCpf.mockReturnValue(null);
  barbeiro_repository.adicionarBarbeiro.mockImplementation((nomeBarbeiro, telefone, cpf) => ({
    idBarbeiro: 3,
    nomeBarbeiro,
    telefone,
    cpf
  }));

  const novoBarbeiro = {
    nomeBarbeiro: "Novo Barbeiro",
    telefone: "123456789",
    cpf: "123.456.789-00"
  };

  const barbeiroAdicionado = barbeiroService.adicionarBarbeiro(
    novoBarbeiro.nomeBarbeiro,
    novoBarbeiro.telefone,
    novoBarbeiro.cpf
  );

  expect(barbeiroAdicionado).toHaveProperty("idBarbeiro");
  expect(barbeiroAdicionado.nomeBarbeiro).toBe(novoBarbeiro.nomeBarbeiro);
  expect(barbeiroAdicionado.telefone).toBe(novoBarbeiro.telefone);
  expect(barbeiroAdicionado.cpf).toBe(novoBarbeiro.cpf);
});

test('Atualizar um barbeiro existente', () => {
  barbeiro_repository.buscarPorId.mockReturnValue({
    idBarbeiro: 1,
    nomeBarbeiro: 'Roger',
    telefone: '123456789',
    cpf: '123.456.789-00'
  });
  barbeiro_repository.buscarPorCpf.mockReturnValue(null);
  barbeiro_repository.atualizarBarbeiro.mockImplementation((id, nomeBarbeiro, telefone, cpf) => ({
    idBarbeiro: id,
    nomeBarbeiro,
    telefone,
    cpf
  }));

  const novoNome = 'Barbeiro Atualizado';
  const barbeiroAtualizado = barbeiroService.atualizarBarbeiro(1, novoNome, '987654321', '987.654.321-00');

  expect(barbeiroAtualizado).toHaveProperty("idBarbeiro", 1);
  expect(barbeiroAtualizado.nomeBarbeiro).toBe(novoNome);
});

test('Listar barbeiros', () => {
  barbeiro_repository.listar.mockReturnValue([
    { idBarbeiro: 1, nomeBarbeiro: 'Roger', telefone: '123456789', cpf: '123.456.789-00' },
    { idBarbeiro: 2, nomeBarbeiro: 'João', telefone: '987654321', cpf: '987.654.321-00' }
  ]);

  const barbeiros = barbeiroService.listar();

  expect(barbeiros).toHaveLength(2);
  expect(barbeiros[0]).toHaveProperty('nomeBarbeiro', 'Roger');
  expect(barbeiros[1]).toHaveProperty('nomeBarbeiro', 'João');
});

test('Deletar um barbeiro existente', () => {
  barbeiro_repository.deletarBarbeiro.mockReturnValue({
    idBarbeiro: 2,
    nomeBarbeiro: 'João',
    telefone: '987654321',
    cpf: '987.654.321-00'
  });

  const barbeiroDeletado = barbeiroService.deletarBarbeiro(2);

  expect(barbeiroDeletado).toHaveProperty("idBarbeiro", 2);
});

test('Tentar adicionar um barbeiro com CPF já cadastrado deve falhar', () => {
  barbeiro_repository.buscarPorCpf.mockReturnValue({
    idBarbeiro: 1,
    nomeBarbeiro: 'Roger',
    telefone: '123456789',
    cpf: '123.456.789-00'
  });

  const novoBarbeiro = {
    nomeBarbeiro: "Outro Barbeiro",
    telefone: "111111111",
    cpf: "123.456.789-00" // CPF já existente
  };

  expect(() => {
    barbeiroService.adicionarBarbeiro(
      novoBarbeiro.nomeBarbeiro,
      novoBarbeiro.telefone,
      novoBarbeiro.cpf
    );
  }).toThrow();
});

test('Tentar atualizar um barbeiro inexistente deve falhar', () => {
  barbeiro_repository.buscarPorId.mockReturnValue(null);

  expect(() => {
    barbeiroService.atualizarBarbeiro(
      999,
      "Nome Inexistente",
      "999999999",
      "999.999.999-99"
    );
  }).toThrow();
});

test('Tentar deletar um barbeiro inexistente deve falhar', () => {
  barbeiro_repository.deletarBarbeiro.mockReturnValue(null);

  expect(() => {
    barbeiroService.deletarBarbeiro(999);
  }).toThrow();
});
