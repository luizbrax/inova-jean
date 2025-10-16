<!-- carrinho.php -->
<?php
include 'config.php';
session_start();
if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Carrinho - Vôlei Store</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style_carrinho.css">
</head>
<body>
    <header>
        <h1>Carrinho</h1>
        <a href="index.php">Continuar Comprando</a>
    </header>
    <main>
        <div id="cart-items">
            <!-- JS will populate -->
        </div>
        <button onclick="checkout()">Confirmar Compra</button>
    </main>
    <script src="js/carrinho.js"></script>
</body>
</html>