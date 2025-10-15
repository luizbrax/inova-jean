//dashboard.js//
let produtos = [];
let produtoEditando = null;

function carregarProdutos() {
    const produtosStorage = localStorage.getItem('produtos');
    if (produtosStorage) {
        produtos = JSON.parse(produtosStorage);
    }
    renderizarProdutos();
}

function salvarProdutosStorage() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function renderizarProdutos() {
    const lista = document.getElementById('produtosLista');
    lista.innerHTML = '';

    produtos.forEach(produto => {
        const item = document.createElement('div');
        item.className = 'produto-item';
        item.innerHTML = `
            <div class="produto-icone">
                <img src="${produto.imagem || 'images/produtos/placeholder.jpg'}" 
                     alt="${produto.nome}" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2240%22%3E📦%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="produto-detalhes">
                <div class="produto-campo">
                    <label>Nome:</label>
                    <input type="text" value="${produto.nome}" onchange="atualizarCampo(${produto.id}, 'nome', this.value)">
                </div>
                <div class="produto-campo">
                    <label>Preço:</label>
                    <input type="number" step="0.01" value="${produto.preco}" onchange="atualizarCampo(${produto.id}, 'preco', parseFloat(this.value))">
                </div>
                <div class="produto-campo">
                    <label>Quantidade:</label>
                    <input type="number" value="${produto.quantidade}" onchange="atualizarCampo(${produto.id}, 'quantidade', parseInt(this.value))">
                </div>
                <div class="produto-campo">
                    <label>Descrição:</label>
                    <textarea onchange="atualizarCampo(${produto.id}, 'descricao', this.value)">${produto.descricao}</textarea>
                </div>
            </div>
            <div class="produto-acoes">
                <button class="btn btn-salvar" onclick="editarProduto(${produto.id})">✏️ Editar</button>
                <button class="btn btn-excluir" onclick="excluirProduto(${produto.id})">🗑️ Excluir</button>
            </div>
        `;
        lista.appendChild(item);
    });
}

function atualizarCampo(id, campo, valor) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produto[campo] = valor;
        salvarProdutosStorage();
        mostrarMensagem('Campo atualizado com sucesso!', 'sucesso');
    }
}

function abrirModalNovo() {
    produtoEditando = null;
    document.getElementById('modalTitulo').textContent = 'Adicionar Novo Produto';
    document.getElementById('formProduto').reset();
    document.getElementById('modalProduto').classList.add('active');
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produtoEditando = produto;
        document.getElementById('modalTitulo').textContent = 'Editar Produto';
        document.getElementById('inputNome').value = produto.nome;
        document.getElementById('inputPreco').value = produto.preco;
        document.getElementById('inputQuantidade').value = produto.quantidade;
        document.getElementById('inputImagem').value = produto.imagem;
        document.getElementById('inputDescricao').value = produto.descricao;
        document.getElementById('modalProduto').classList.add('active');
    }
}

function fecharModal() {
    document.getElementById('modalProduto').classList.remove('active');
    produtoEditando = null;
}

function salvarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('inputNome').value;
    const preco = parseFloat(document.getElementById('inputPreco').value);
    const quantidade = parseInt(document.getElementById('inputQuantidade').value);
    const imagem = document.getElementById('inputImagem').value || 'images/produtos/placeholder.jpg';
    const descricao = document.getElementById('inputDescricao').value;

    if (produtoEditando) {
        produtoEditando.nome = nome;
        produtoEditando.preco = preco;
        produtoEditando.quantidade = quantidade;
        produtoEditando.imagem = imagem;
        produtoEditando.descricao = descricao;
        mostrarMensagem('Produto atualizado com sucesso!', 'sucesso');
    } else {
        const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
        produtos.push({
            id: novoId,
            nome,
            preco,
            quantidade,
            imagem,
            descricao
        });
        mostrarMensagem('Produto adicionado com sucesso!', 'sucesso');
    }

    salvarProdutosStorage();
    renderizarProdutos();
    fecharModal();
}

function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        produtos = produtos.filter(p => p.id !== id);
        salvarProdutosStorage();
        renderizarProdutos();
        mostrarMensagem('Produto excluído com sucesso!', 'sucesso');
    }
}

function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo} show`;

    setTimeout(() => {
        mensagem.classList.remove('show');
    }, 3000);
}

window.onload = carregarProdutos;

document.getElementById('modalProduto').addEventListener('click', function (e) {
    if (e.target === this) {
        fecharModal();
    }
});