//produtos.js//
let produto = null;
let quantidadeSelecionada = 1;

function carregarProduto() {
    const produtoId = parseInt(localStorage.getItem('produtoAtual'));
    const produtosStorage = localStorage.getItem('produtos');

    if (!produtosStorage || !produtoId) {
        alert('Produto não encontrado!');
        window.close();
        return;
    }

    const produtos = JSON.parse(produtosStorage);
    produto = produtos.find(p => p.id === produtoId);

    if (!produto) {
        alert('Produto não encontrado!');
        window.close();
        return;
    }

    renderizarProduto();
}

function renderizarProduto() {
    // Renderizar imagem
    const imagemElement = document.getElementById('produtoImagem');
    imagemElement.innerHTML = `<img src="${produto.imagem}" alt="${produto.nome}" 
        onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2240%22%3E📦%3C/text%3E%3C/svg%3E'">`;

    document.getElementById('produtoNome').textContent = produto.nome;
    document.getElementById('produtoPreco').textContent = `R$ ${produto.preco.toFixed(2)}`;
    document.getElementById('produtoDescricao').textContent = produto.descricao;
    document.getElementById('produtoCodigo').textContent = `#${String(produto.id).padStart(4, '0')}`;

    const emEstoque = produto.quantidade > 0;
    const estoqueElement = document.getElementById('produtoEstoque');

    if (emEstoque) {
        estoqueElement.textContent = `Em estoque: ${produto.quantidade} unidades`;
        estoqueElement.classList.remove('fora');
        document.getElementById('produtoDisponibilidade').textContent = 'Disponível';
    } else {
        estoqueElement.textContent = 'Produto fora de estoque';
        estoqueElement.classList.add('fora');
        document.getElementById('produtoDisponibilidade').textContent = 'Indisponível';
        document.getElementById('btnAdicionar').disabled = true;
        document.getElementById('btnAumentar').disabled = true;
    }
}

function aumentarQuantidade() {
    if (quantidadeSelecionada < produto.quantidade) {
        quantidadeSelecionada++;
        document.getElementById('quantidadeValor').textContent = quantidadeSelecionada;
    }
}

function diminuirQuantidade() {
    if (quantidadeSelecionada > 1) {
        quantidadeSelecionada--;
        document.getElementById('quantidadeValor').textContent = quantidadeSelecionada;
    }
}

function adicionarAoCarrinho() {
    if (!produto || produto.quantidade === 0) return;

    let carrinho = [];
    const carrinhoStorage = localStorage.getItem('carrinho');

    if (carrinhoStorage) {
        carrinho = JSON.parse(carrinhoStorage);
    }

    const itemExistente = carrinho.find(item => item.id === produto.id);

    if (itemExistente) {
        const novaQuantidade = itemExistente.quantidade + quantidadeSelecionada;
        if (novaQuantidade <= produto.quantidade) {
            itemExistente.quantidade = novaQuantidade;
        } else {
            alert(`Quantidade máxima disponível: ${produto.quantidade}`);
            return;
        }
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: quantidadeSelecionada,
            imagem: produto.imagem
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    const mensagem = document.getElementById('mensagemSucesso');
    mensagem.classList.add('show');

    setTimeout(() => {
        mensagem.classList.remove('show');
    }, 3000);

    quantidadeSelecionada = 1;
    document.getElementById('quantidadeValor').textContent = quantidadeSelecionada;
}

window.onload = carregarProduto;