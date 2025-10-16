<!-- produto.php -->
<?php
include 'config.php';
$id = $_GET['id'];
$product = $conn->query("SELECT * FROM products WHERE id=$id")->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title><?php echo $product['name']; ?> - Vôlei Store</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style_produtos.css">
</head>
<body>
    <header>
        <h1><?php echo $product['name']; ?></h1>
        <a href="index.php">Home</a>
    </header>
    <main>
        <img src="<?php echo $product['image']; ?>" alt="<?php echo $product['name']; ?>">
        <p>Preço: R$ <?php echo $product['price']; ?></p>
        <p>Quantidade: <?php echo $product['quantity']; ?></p>
        <p>Descrição: <?php echo $product['description']; ?></p>
        <button onclick="addToCart(<?php echo $product['id']; ?>)">Adicionar ao Carrinho</button>
    </main>
    <script src="js/main.js"></script>
</body>
</html>