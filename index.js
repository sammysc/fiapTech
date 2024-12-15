const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require('./routes/posts');

app.use(express.json());
app.use('/posts', postsRouter);   // Rota de posts

app.get('/', (req, res) => {
  res.send('Bem-vindo à plataforma educacional!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});