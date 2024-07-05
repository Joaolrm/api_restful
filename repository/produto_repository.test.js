const produto_repository = require('./produto_repository');

let listaProdutosEsperadaDoListar = [
    {
        id: 1,
        nome: "arroz",
        categoria: "alimento",
        preco: 5.80
    },
    {
        id: 2,
        nome: "leite",
        categoria: "bebida",
        preco: 4.25
    }
];

const produtoInseridoEsperado = { 
    id: 3,
    nome: "Feijao", 
    categoria: "alimento", 
    preco: 8.00 
};



test('O metodo listar deve retornar a lista esperada e ter quantidade 2', () => {
    expect(produto_repository.listar()).toEqual(listaProdutosEsperadaDoListar);
    expect(produto_repository.listar()).toHaveLength(2);
})

test('Quando inserir o produto feijao, a lista deve conter o produto feijao com id=3', () => {
    produto_repository.inserir({ 
        nome: "Feijao", 
        categoria: "alimento", 
        preco: 8.00 
    });

    expect(produto_repository.listar()).toContainEqual(produtoInseridoEsperado);

})


