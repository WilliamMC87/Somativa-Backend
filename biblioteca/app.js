const express = require('express');
const mongoose = require('mongoose');
const Livro = require('./models/Livro'); // Caminho para o modelo de Livro

const app = express();

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/biblioteca', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.log("Erro ao conectar no MongoDB: ", err));

app.use(express.json()); // Para que o Express consiga processar JSON no corpo das requisições

// Rota POST para adicionar um livro
app.post('/livros', async (req, res) => {
  const { titulo, autor, anoDePublicacao, isbn } = req.body;

  try {
    const livro = new Livro({ titulo, autor, anoDePublicacao, isbn });
    await livro.save();
    res.status(201).send(livro);
  } catch (err) {
    res.status(400).send({ error: 'Erro ao adicionar o livro', details: err.message });
  }
});

// Rota GET para listar todos os livros
app.get('/livros', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.status(200).json(livros);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao listar os livros', details: err.message });
  }
});

// Rota GET para buscar livros por título
app.get('/livros/buscar', async (req, res) => {
  const { titulo } = req.query;

  try {
    const livros = await Livro.find({ titulo: new RegExp(titulo, 'i') });
    res.status(200).json(livros);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao buscar livros', details: err.message });
  }
});

// Definir porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
