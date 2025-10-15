//carrinho.js//
// ===== CARRINHO =====
function adicionarAoCarrinho(id, event) {
    event.stopPropagation();
    const produto = produtos.find(p => p.id === id);

    if (produto && produto.quantidade > 0) {
        const itemCarrinho = carrinho.find(item => item.id === id);

        if (itemCarrinho) {
            if (itemCarrinho.quantidade < produto.quantidade) {
                itemCarrinho.quantidade++;
            } else {
                alert('Quantidade máxima em estoque atingida!');
                return;
            }
        } else {
            carrinho.push({
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                quantidade: 1,
                imagem: produto.imagem
            });
        }

        salvarCarrinho();
        renderizarCarrinho();
        atualizarContadorCarrinho();
    }
}

function renderizarCarrinho() {
    const container = document.getElementById('carrinhoItens');
    
    if (carrinho.length === 0) {
        container.innerHTML = '<div class="carrinho-vazio">Seu carrinho está vazio</div>';
        document.getElementById('carrinhoTotal').textContent = 'R$ 0,00';
        return;
    }

    container.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const div = document.createElement('div');
        div.className = 'carrinho-item';
        div.innerHTML = `
            <div class="carrinho-item-imagem">
                <img src="${item.imagem}" alt="${item.nome}" 
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2240%22%3E📦%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="carrinho-item-info">
                <div class="carrinho-item-nome">${item.nome}</div>
                <div class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</div>
                <div class="carrinho-item-controles">
                    <button class="carrinho-btn" onclick="diminuirQuantidadeCarrinho(${item.id})">-</button>
                    <span class="carrinho-quantidade">${item.quantidade}</span>
                    <button class="carrinho-btn" onclick="aumentarQuantidadeCarrinho(${item.id})">+</button>
                    <button class="carrinho-btn-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
                </div>
            </div>
        `;
        container.appendChild(div);
        total += item.preco * item.quantidade;
    });

    document.getElementById('carrinhoTotal').textContent = `R$ ${total.toFixed(2)}`;
}

function aumentarQuantidadeCarrinho(id) {
    const item = carrinho.find(item => item.id === id);
    const produto = produtos.find(p => p.id === id);

    if (item && produto && item.quantidade < produto.quantidade) {
        item.quantidade++;
        salvarCarrinho();
        renderizarCarrinho();
        atualizarContadorCarrinho();
    } else {
        alert('Quantidade máxima em estoque atingida!');
    }
}

function diminuirQuantidadeCarrinho(id) {
    const item = carrinho.find(item => item.id === id);

    if (item) {
        if (item.quantidade > 1) {
            item.quantidade--;
            salvarCarrinho();
            renderizarCarrinho();
            atualizarContadorCarrinho();
        } else {
            removerDoCarrinho(id);
        }
    }
}

function removerDoCarrinho(id) {
    if (confirm('Deseja remover este item do carrinho?')) {
        carrinho = carrinho.filter(item => item.id !== id);
        salvarCarrinho();
        renderizarCarrinho();
        atualizarContadorCarrinho();
    }
}

function limparCarrinho() {
    if (carrinho.length === 0) {
        alert('O carrinho já está vazio!');
        return;
    }

    if (confirm('Deseja remover todos os itens do carrinho?')) {
        carrinho = [];
        salvarCarrinho();
        renderizarCarrinho();
        atualizarContadorCarrinho();
    }
}

function abrirConfirmacao() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const resumo = document.getElementById('resumoCompra');
    let html = '<strong>Itens:</strong><br>';
    let total = 0;

    carrinho.forEach(item => {
        html += `${item.nome} - ${item.quantidade}x R$ ${item.preco.toFixed(2)}<br>`;
        total += item.preco * item.quantidade;
    });

    html += `<br><strong>Total: R$ ${total.toFixed(2)}</strong>`;
    resumo.innerHTML = html;

    document.getElementById('modalConfirmacao').classList.add('active');
}

function fecharConfirmacao() {
    document.getElementById('modalConfirmacao').classList.remove('active');
}

function confirmarCompra() {
    carrinho.forEach(itemCarrinho => {
        const produto = produtos.find(p => p.id === itemCarrinho.id);
        if (produto) {
            produto.quantidade -= itemCarrinho.quantidade;
            if (produto.quantidade < 0) produto.quantidade = 0;
        }
    });

    localStorage.setItem('produtos', JSON.stringify(produtos));

    carrinho = [];
    salvarCarrinho();

    fecharConfirmacao();
    toggleCarrinho();

    renderizarProdutos();
    renderizarCarrinho();
    atualizarContadorCarrinho();

    alert('✓ Compra realizada com sucesso! O estoque foi atualizado.');
}

function atualizarContadorCarrinho() {
    const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    document.getElementById('cartCount').textContent = total;
}

function toggleCarrinho() {
    document.getElementById('carrinhoModal').classList.toggle('active');
}