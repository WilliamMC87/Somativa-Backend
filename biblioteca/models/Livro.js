const mongoose = require('mongoose');

// Definição do esquema de livro
const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  anoDePublicacao: { type: Number, required: true },
  isbn: { type: String, required: true, unique: true }
});

// Criação do modelo
const Livro = mongoose.model('Livro', livroSchema);

module.exports = Livro;
