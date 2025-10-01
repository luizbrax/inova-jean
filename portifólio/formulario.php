<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_SESSION["nome"] = $_POST["nome"];
    $_SESSION["data_nascimento"] = $_POST["data_nascimento"];
    $_SESSION["nacionalidade"] = $_POST["nacionalidade"];
    $_SESSION["cidade"] = $_POST["cidade"];
    $_SESSION["estado"] = $_POST["estado"];
    $_SESSION["sobre"] = $_POST["sobre"];
    $_SESSION["idioma"] = $_POST["idioma"];
    $_SESSION["fluencia"] = $_POST["fluencia"];

    if (!empty($_FILES["foto"]["name"])) {
        // Transformar a foto em Base64
        $imagem = file_get_contents($_FILES["foto"]["tmp_name"]);
        $tipo = mime_content_type($_FILES["foto"]["tmp_name"]); // ex: image/jpeg
        $_SESSION["foto"] = 'data:' . $tipo . ';base64,' . base64_encode($imagem);
    }

    header("Location: portifolio.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Formulário do Portfólio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <form method="POST" enctype="multipart/form-data" class="form-card">
    <h2>Crie seu Portfólio</h2>

    <!-- Nome + Foto -->
    <div class="linha">
      <div class="col">
        <label>Nome</label>
        <input type="text" name="nome" required>
      </div>
      <div class="col foto-upload">
        <label for="foto" class="foto">
          <div class="foto-preview" id="preview">+</div>
        </label>
        <input type="file" id="foto" name="foto" accept="image/*" onchange="previewFoto(event)">
      </div>
    </div>

    <!-- Data + Nacionalidade -->
    <div class="linha">
      <div class="col">
        <label>Data de Nascimento</label>
        <input type="date" name="data_nascimento" required>
      </div>
      <div class="col">
        <label>Nacionalidade</label>
        <input type="text" name="nacionalidade" required>
      </div>
    </div>

    <!-- Cidade + Estado -->
    <div class="linha">
      <div class="col">
        <label>Cidade</label>
        <input type="text" name="cidade" required>
      </div>
      <div class="col">
        <label>Estado</label>
        <input type="text" name="estado" required>
      </div>
    </div>

    <!-- Sobre -->
    <label>Sobre você</label>
    <textarea name="sobre" rows="4" required></textarea>

    <!-- Idioma + Fluência -->
    <label>Idioma</label>
    <input type="text" name="idioma" placeholder="Ex: Inglês, Espanhol...">

    <label>Nível de Fluência</label>
    <div class="fluencia-opcoes">
      <label><input type="radio" name="fluencia" value="Não" required> Não</label>
      <label><input type="radio" name="fluencia" value="Baixa"> Baixa</label>
      <label><input type="radio" name="fluencia" value="Intermediária"> Intermediária</label>
      <label><input type="radio" name="fluencia" value="Fluente"> Fluente</label>
    </div>

    <!-- Botão -->
    <button type="submit" class="btn-salvar">Salvar Portfólio</button>
  </form>

  <script>
    function previewFoto(event) {
      const preview = document.getElementById('preview');
      const reader = new FileReader();
      reader.onload = function(e) {
        preview.style.backgroundImage = `url(${e.target.result})`;
        preview.textContent = '';
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  </script>
</body>
</html>
