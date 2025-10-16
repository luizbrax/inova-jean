// checkout.php
<?php
include 'config.php';
session_start();
if (isset($_SESSION['cart'])) {
    foreach ($_SESSION['cart'] as $id => $qty) {
        $sql = "INSERT INTO sales (product_id, quantity) VALUES ($id, $qty)";
        $conn->query($sql);
        // Update product quantity
        $conn->query("UPDATE products SET quantity = quantity - $qty WHERE id = $id");
    }
    unset($_SESSION['cart']);
    echo "Compra confirmada!";
}
?>