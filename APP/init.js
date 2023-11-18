const express = require('express');
const path = require('path');
const app = express();

// Lista de pastas e arquivos que voc� deseja incluir no cache
const staticFolders = ['assets', 'favicon', 'produtos', 'logo.png'];

// Configurando o middleware para servir arquivos est�ticos com cache espec�fico para cada item
staticFolders.forEach(folderOrFile => {
  const fullPath = path.join(__dirname, 'build', folderOrFile);
  app.use(`/${folderOrFile}`, express.static(fullPath, {
    maxAge: '1w', // Cache por uma semana
  }));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
