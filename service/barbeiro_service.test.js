const barbeiroService = require('../service/barbeiro_service');

test('Adicionar um novo barbeiro', () => {
  const novoBarbeiro = {
    nomeBarbeiro: 'Novo Barbeiro',
    telefone: '123456789',
    cpf: '123.456.789-00'
  };

  const barbeiroAdicionado = barbeiroService.adicionarBarbeiro(novoBarbeiro.nomeBarbeiro, novoBarbeiro.telefone, novoBarbeiro.cpf);

  expect(barbeiroAdicionado).toHaveProperty('idBarbeiro');
  expect(barbeiroAdicionado.nomeBarbeiro).toBe(novoBarbeiro.nomeBarbeiro);
  expect(barbeiroAdicionado.telefone).toBe(novoBarbeiro.telefone);
  expect(barbeiroAdicionado.cpf).toBe(novoBarbeiro.cpf);
});

test('Atualizar um barbeiro existente', () => {
  const novoNome = 'Barbeiro Atualizado';
  const barbeiroAtualizado = barbeiroService.atualizarBarbeiro(1, novoNome, '987654321', '987.654.321-00');

  expect(barbeiroAtualizado).toHaveProperty('idBarbeiro', 1);
  expect(barbeiroAtualizado.nomeBarbeiro).toBe(novoNome);
});

test('Listar barbeiros', () => {
  const barbeiros = barbeiroService.listar();

  expect(barbeiros).toHaveLength(2); // Considerando que já há dois barbeiros na lista inicial
});

test('Deletar um barbeiro existente', () => {
  const barbeiroDeletado = barbeiroService.deletarBarbeiro(2);

  expect(barbeiroDeletado).toHaveProperty('idBarbeiro', 2);
});

test('Tentar adicionar um barbeiro com CPF já cadastrado deve falhar', () => {
  const novoBarbeiro = {
    nomeBarbeiro: 'Outro Barbeiro',
    telefone: '111111111',
    cpf: '123.456.789-00' // CPF já existente
  };

  expect(() => {
    barbeiroService.adicionarBarbeiro(novoBarbeiro.nomeBarbeiro, novoBarbeiro.telefone, novoBarbeiro.cpf);
  }).toThrow();
});

test('Tentar atualizar um barbeiro inexistente deve falhar', () => {
  expect(() => {
    barbeiroService.atualizarBarbeiro(999, 'Nome Inexistente', '999999999', '999.999.999-99');
  }).toThrow();
});

test('Tentar deletar um barbeiro inexistente deve falhar', () => {
  expect(() => {
    barbeiroService.deletarBarbeiro(999);
  }).toThrow();
});
