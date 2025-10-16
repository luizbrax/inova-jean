// js/carrinho.js
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    const itemsDiv = document.getElementById('cart-items');
    for (let id in cart) {
        const div = document.createElement('div');
        div.innerHTML = `Produto ID: ${id} - Qty: ${cart[id]} <button onclick="addMore(${id})">+</button>`;
        itemsDiv.appendChild(div);
    }
}

function addMore(id) {
    addToCart(id); // Reuse from main.js
    location.reload();
}

function checkout() {
    // Redirect to checkout.php or handle via AJAX
    fetch('checkout.php', {method: 'POST'}).then(() => {
        localStorage.removeItem('cart');
        alert('Compra confirmada!');
        location.href = 'index.php';
    });
}

document.addEventListener('DOMContentLoaded', loadCart);