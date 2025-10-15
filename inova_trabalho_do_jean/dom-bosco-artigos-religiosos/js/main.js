// main.js //
// ===== DADOS DOS PRODUTOS =====
const produtosIniciais = [
    {
        id: 1,
        nome: 'Cadeia de consagração',
        preco: 45.90,
        quantidade: 15,
        descricao: 'Cadeia de consagração em aço inoxidável com medalha de Nossa Senhora. Resistente e elegante.',
        imagem: 'images/produtos/cadeia-consagracao.jpg'
    },
    {
        id: 2,
        nome: 'Imagem de Nossa Senhora das Graças',
        preco: 89.90,
        quantidade: 8,
        descricao: 'Imagem de 30cm em resina pintada à mão. Perfeita para altar doméstico.',
        imagem: 'images/produtos/nossa-senhora-gracas.jpg'
    },
    {
        id: 3,
        nome: 'Crucifixo de madeira de mesa',
        preco: 65.00,
        quantidade: 0,
        descricao: 'Crucifixo em madeira nobre de 25cm. Ideal para mesa ou parede.',
        imagem: 'images/produtos/crucifixo-madeira.jpg'
    },
    {
        id: 4,
        nome: 'Terço de São Miguel Arcanjo',
        preco: 55.50,
        quantidade: 20,
        descricao: 'Terço especial com 9 contas por mistério, dedicado a São Miguel Arcanjo.',
        imagem: 'images/produtos/terco-sao-miguel.jpg'
    },
    {
        id: 5,
        nome: 'Imagem de São José dormindo',
        preco: 79.90,
        quantidade: 12,
        descricao: 'Imagem de 20cm representando São José dormindo. Perfeita para pedidos especiais.',
        imagem: 'images/produtos/sao-jose-dormindo.jpg'
    },
    {
        id: 6,
        nome: 'Imagem de São Dom Bosco',
        preco: 95.00,
        quantidade: 6,
        descricao: 'Imagem de 35cm do padroeiro dos jovens em resina de alta qualidade.',
        imagem: 'images/produtos/sao-dom-bosco.jpg'
    },
    {
        id: 7,
        nome: 'Terço de rosas – Santa Terezinha',
        preco: 42.00,
        quantidade: 18,
        descricao: 'Terço delicado com contas em forma de rosas, dedicado à Santa Terezinha.',
        imagem: 'images/produtos/terco-rosas.jpg'
    },
    {
        id: 8,
        nome: 'Vela de 7 dias para novena',
        preco: 28.50,
        quantidade: 30,
        descricao: 'Vela de parafina que dura 7 dias. Ideal para novenas e orações prolongadas.',
        imagem: 'images/produtos/vela-novena.jpg'
    }
];
// ===== INICIALIZAÇÃO =====
let produtos = [];
let carrinho = [];

function inicializar() {
    carregarProdutos();
    carregarCarrinho();
    renderizarProdutos();
    renderizarCarrinho();
    iniciarCarrossel();
}

function carregarProdutos() {
    const produtosStorage = localStorage.getItem('produtos');
    if (produtosStorage) {
        produtos = JSON.parse(produtosStorage);
    } else {
        produtos = produtosIniciais;
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }
}

function carregarCarrinho() {
    const carrinhoStorage = localStorage.getItem('carrinho');
    if (carrinhoStorage) {
        carrinho = JSON.parse(carrinhoStorage);
    }
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}



// ===== RENDERIZAÇÃO DE PRODUTOS =====
function renderizarProdutos() {
    const grade = document.getElementById('produtosGrade');
    grade.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';

        const emEstoque = produto.quantidade > 0;

        card.innerHTML = `
            <div class="produto-imagem">
                <img src="${produto.imagem}" alt="${produto.nome}" />
            </div>
            <div class="produto-nome">${produto.nome}</div>
            <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
            <div class="produto-status ${!emEstoque ? 'fora-estoque' : ''}">
                ${emEstoque ? `Em estoque: ${produto.quantidade}` : 'Fora de estoque'}
            </div>
            <button class="btn btn-adicionar" 
                    ${!emEstoque ? 'disabled' : ''} 
                    onclick="adicionarAoCarrinho(${produto.id}, event)">
                ${emEstoque ? 'Adicionar ao Carrinho' : 'Indisponível'}
            </button>
        `;

        card.onclick = (e) => {
            if (!e.target.classList.contains('btn-adicionar')) {
                abrirProduto(produto.id);
            }
        };

        grade.appendChild(card);
    });
}


// ===== NAVEGAÇÃO =====
function toggleConfig() {
    document.getElementById('configMenu').classList.toggle('active');
}

function voltarHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function abrirProduto(id) {
    localStorage.setItem('produtoAtual', id);
    window.location.href = 'produto.html';
}

// ===== INICIAR =====
window.onload = inicializar;

// Fechar menu de configurações ao clicar fora
document.addEventListener('click', function (event) {
    const configMenu = document.getElementById('configMenu');
    const configButton = event.target.closest('.nav-icon');

    if (!configButton && !configMenu.contains(event.target)) {
        configMenu.classList.remove('active');
    }
});