<!-- index.php -->
<?php
session_start();
include 'config.php';
$products = $conn->query("SELECT * FROM products LIMIT 4")->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Home - Vôlei Store</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style_index.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
</head>
<body class="light-theme">
    <header>
        <h1>Vôlei Store</h1>
        <nav>
            <a href="index.php">Home</a>
            <a href="sobre.php">Sobre</a>
            <a href="contato.php">Contato</a>
        </nav>
        <div class="header-actions">
            <button id="theme-toggle">Toggle Theme</button>
            <a href="carrinho.php">Carrinho (<span id="cart-count">0</span>)</a>
            <a href="login.php">Login/Cadastro</a>
        </div>
    </header>
    <main>
        <div class="products-grid">
            <?php foreach ($products as $product): ?>
                <div class="product">
                    <img src="<?php echo $product['image']; ?>" alt="<?php echo $product['name']; ?>">
                    <h2><a href="produto.php?id=<?php echo $product['id']; ?>"><?php echo $product['name']; ?></a></h2>
                    <p>Preço: R$ <?php echo $product['price']; ?></p>
                    <p>Quantidade disponível: <?php echo $product['quantity']; ?></p>
                    <button onclick="addToCart(<?php echo $product['id']; ?>)">Adicionar ao Carrinho</button>
                </div>
            <?php endforeach; ?>
        </div>
    </main>
    <footer>
        <p>&copy; 2025 Vôlei Store - Contato: <a href="mailto:luizbrazx1@gmail.com">luizbrazx1@gmail.com</a></p>
    </footer>
    <script src="js/main.js"></script>
</body>
</html>
