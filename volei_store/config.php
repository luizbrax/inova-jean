// config.php
<?php
$servername = "localhost";
$username = "root"; // Change to your DB username
$password = ""; // Change to your DB password
$dbname = "volei_store";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create tables if not exist
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) DEFAULT 0
)";

$conn->query($sql);

$sql = "CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
)";

$conn->query($sql);

$sql = "CREATE TABLE IF NOT EXISTS sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
)";

$conn->query($sql);

// Insert initial products if none exist
$result = $conn->query("SELECT COUNT(*) as count FROM products");
$row = $result->fetch_assoc();
if ($row['count'] == 0) {
    $products = [
        ['Bola de Vôlei Mikasa', 150.00, 10, 'images/bola-volei-mikasa.jpg', 'Bola oficial de vôlei Mikasa.'],
        ['Esparadrapo', 20.00, 50, 'images/esparadrapo.jpg', 'Esparadrapo para proteção.'],
        ['Joelheira', 80.00, 20, 'images/joelheira.jpg', 'Joelheira para vôlei.'],
        ['Manguito', 50.00, 30, 'images/manguito.jpg', 'Manguito para braço.']
    ];
    foreach ($products as $p) {
        $sql = "INSERT INTO products (name, price, quantity, image, description) VALUES ('$p[0]', $p[1], $p[2], '$p[3]', '$p[4]')";
        $conn->query($sql);
    }
}

// Insert admin user if not exist (password: admin123 hashed)
$hashed = password_hash('admin123', PASSWORD_DEFAULT);
$sql = "INSERT IGNORE INTO users (email, password, is_admin) VALUES ('admin@example.com', '$hashed', 1)";
$conn->query($sql);
?>