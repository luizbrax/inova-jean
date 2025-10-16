// js/main.js
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[id] = (cart[id] || 0) + 1;
    if (Object.values(cart).reduce((a, b) => a + b, 0) > 25) {
        alert('Carrinho cheio!');
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Produto adicionado ao carrinho!');
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    document.getElementById('cart-count').innerText = Object.values(cart).reduce((a, b) => a + b, 0);
}

function showNotification(msg) {
    const div = document.createElement('div');
    div.style.position = 'fixed'; div.style.top = '10px'; div.style.right = '10px';
    div.style.background = 'green'; div.style.color = 'white'; div.style.padding = '10px';
    div.innerText = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });
});