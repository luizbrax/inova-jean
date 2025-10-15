function toggleConfig() {
            document.getElementById('configMenu').classList.toggle('active');
        }

        function atualizarContador() {
            const carrinhoStorage = localStorage.getItem('carrinho');
            if (carrinhoStorage) {
                const carrinho = JSON.parse(carrinhoStorage);
                const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
                document.getElementById('cartCount').textContent = total;
            }
        }

        window.onload = atualizarContador;

        document.addEventListener('click', function(event) {
            const configMenu = document.getElementById('configMenu');
            const configButton = event.target.closest('.nav-icon');
            
            if (!configButton && !configMenu.contains(event.target)) {
                configMenu.classList.remove('active');
            }
        });