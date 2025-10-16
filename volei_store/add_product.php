// add_product.php
<?php
include 'config.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];
    $image = $_POST['image']; // Assume upload handled separately
    $description = $_POST['description'];
    $sql = "INSERT INTO products (name, price, quantity, image, description) VALUES ('$name', $price, $quantity, '$image', '$description')";
    $conn->query($sql);
    header('Location: admin.php');
}
?>
<form method="POST">
    <!-- Fields for name, price, quantity, image, description -->
    <input type="submit" value="Adicionar">
</form>