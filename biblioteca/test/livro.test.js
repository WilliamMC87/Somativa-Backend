const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Caminho para o app.js
const Livro = require('../models/Livro'); // Modelo Livro

describe('POST /livros', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/biblioteca', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await Livro.deleteMany({});  // Limpa a coleção de livros após os testes
    await mongoose.connection.close();
  });

  it('deve adicionar um novo livro', async () => {
    const novoLivro = {
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      anoDePublicacao: 1899,
      isbn: '978-8535911191'
    };

    const response = await request(app)
      .post('/livros')
      .send(novoLivro)
      .expect('Content-Type', /json/)
      .expect(201);

    // Verificar se o livro foi adicionado
    const livroSalvo = await Livro.findById(response.body._id);
    expect(livroSalvo).to.not.be.null;
    expect(livroSalvo.titulo).to.equal(novoLivro.titulo);
    expect(livroSalvo.autor).to.equal(novoLivro.autor);
    expect(livroSalvo.anoDePublicacao).to.equal(novoLivro.anoDePublicacao);
    expect(livroSalvo.isbn).to.equal(novoLivro.isbn);
  });
});
