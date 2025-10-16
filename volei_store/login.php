// login.php
<?php
include 'config.php';
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $result = $conn->query("SELECT * FROM users WHERE email='$email'");
    $user = $result->fetch_assoc();
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user;
        if ($user['is_admin']) {
            header('Location: admin.php');
        } else {
            header('Location: index.php');
        }
    }
}
?>
<form method="POST">
    <input type="email" name="email">
    <input type="password" name="password">
    <input type="submit" value="Login">
</form>
<a href="cadastro.php">Cadastro</a>