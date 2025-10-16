<!-- admin.php (Dashboard) -->
<?php
include 'config.php';
session_start();
if (!isset($_SESSION['user']) || !$_SESSION['user']['is_admin']) {
    header('Location: index.php');
    exit;
}
$products = $conn->query("SELECT p.id, p.name, SUM(s.quantity) as sales FROM products p LEFT JOIN sales s ON p.id = s.product_id GROUP BY p.id")->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Vôlei Store</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style_admin.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <header>
        <h1>Dashboard</h1>
        <a href="logout.php">Logout</a>
    </header>
    <main>
        <section>
            <h2>Produtos</h2>
            <ul>
                <?php foreach ($products as $p): ?>
                    <li><?php echo $p['name']; ?> - <a href="edit_product.php?id=<?php echo $p['id']; ?>">Editar</a></li>
                <?php endforeach; ?>
            </ul>
            <a href="add_product.php">Adicionar Produto</a>
        </section>
        <section>
            <h2>Gráfico de Vendas</h2>
            <canvas id="salesChart" width="400" height="400"></canvas>
        </section>
    </main>
    <script>
        const ctx = document.getElementById('salesChart').getContext('2d');
        const data = {
            labels: <?php echo json_encode(array_column($products, 'name')); ?>,
            datasets: [{
                data: <?php echo json_encode(array_column($products, 'sales') ?: array_fill(0, count($products), 0)); ?>,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        };
        new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.raw} vendas`
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>