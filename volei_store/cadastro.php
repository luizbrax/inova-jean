// cadastro.php (register)
<?php
include 'config.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";
    $conn->query($sql);
    header('Location: login.php');
}
?>
<form method="POST">
    <!-- email, password -->
    <input type="submit" value="Cadastrar">
</form>