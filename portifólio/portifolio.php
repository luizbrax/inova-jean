<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Meu Portfólio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="form-card">
    <h2>Meu Portfólio</h2>

    <!-- Nome + Foto -->
    <div class="linha-portfolio">
      <div class="col-portfolio">
        <label>Nome</label>
        <div><?php echo $_SESSION['nome'] ?? ''; ?></div>
      </div>
      <div class="col-portfolio foto-upload">
        <?php if(!empty($_SESSION['foto'])): ?>
          <div class="foto-preview" style="background-image:url('<?php echo $_SESSION['foto']; ?>');"></div>
        <?php else: ?>
          <div class="foto-preview">+</div>
        <?php endif; ?>
      </div>
    </div>

    <!-- Data + Nacionalidade -->
    <div class="linha-portfolio">
      <div class="col-portfolio">
        <label>Data de Nascimento</label>
        <div><?php echo $_SESSION['data_nascimento'] ?? ''; ?></div>
      </div>
      <div class="col-portfolio">
        <label>Nacionalidade</label>
        <div><?php echo $_SESSION['nacionalidade'] ?? ''; ?></div>
      </div>
    </div>

    <!-- Cidade + Estado -->
    <div class="linha-portfolio">
      <div class="col-portfolio">
        <label>Cidade</label>
        <div><?php echo $_SESSION['cidade'] ?? ''; ?></div>
      </div>
      <div class="col-portfolio">
        <label>Estado</label>
        <div><?php echo $_SESSION['estado'] ?? ''; ?></div>
      </div>
    </div>

    <!-- Sobre -->
    <div class="linha-portfolio">
      <div class="col-portfolio full-row">
        <label>Sobre você</label>
        <div><?php echo nl2br($_SESSION['sobre'] ?? ''); ?></div>
      </div>
    </div>

    <!-- Idioma + Fluência -->
    <div class="linha-portfolio">
      <div class="col-portfolio">
        <label>Idioma</label>
        <div><?php echo $_SESSION['idioma'] ?? ''; ?></div>
      </div>
      <div class="col-portfolio">
        <label>Fluência</label>
        <div><?php echo $_SESSION['fluencia'] ?? ''; ?></div>
      </div>
    </div>

  </div>
</body>
</html>
