const request = require('supertest');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const postsRouter = require('../routes/posts');
const { Post } = require('../models');


afterEach(async () => {
  await Post.destroy({ where: {}, truncate: true });   // Limpa a tabela de posts
});

const sequelize = new Sequelize('sqlite::memory:');


const app = express();   // Cria uma instância do Express
app.use(express.json()); // Middleware para o Express interpretar JSON
app.use('/posts', postsRouter); // Rota de posts

beforeAll(async () => {   // Antes de todos os testes, sincroniza o modelo com o banco de dados
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();   // Após todos os testes, fecha a conexão com o banco de dados
});

describe('POST /posts', () => {                      // Testes para a rota de criação de postagens
  it('criação de uma nova postagem', async () => {
    const res = await request(app)
      .post('/posts') 
      .send({
        title: 'Teste Postagem',
        content: 'Aqui é o conteúdo da postagem',
        author: 'O nome do autor'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});

describe('GET /posts', () => {
  it('exibir todas as postagens', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('GET /posts/:id', () => {
  it('encontra uma postagem por ID', async () => {
    const post = await Post.create({
      title: 'Teste Postagem',
      content: 'Aqui é o conteúdo da postagem',
      author: 'O nome do autor'
    });
    const res = await request(app).get(`/posts/${post.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', post.id);
  });
});

describe('PUT /posts/:id', () => {
  it('atualiza postagem pelo ID', async () => {
    const post = await Post.create({
      title: 'Teste Postagem',
      content: 'Aqui é o conteúdo da postagem',
      author: 'O nome do autor'
    });
    const res = await request(app)
      .put(`/posts/${post.id}`)
      .send({
        title: 'Postagem Atualizada',
        content: 'Aqui é o conteúdo atualizado da postagem',
        author: 'O nome do autor atualizado'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Postagem Atualizada');
  });
});

describe('DELETE /posts/:id', () => {
  it('apaga postagem por ID', async () => {
    const post = await Post.create({
      title: 'Postagem Atualizada',
      content: 'Aqui é o conteúdo atualizado da postagem',
      author: 'O nome do autor atualizado'
    });
        
    const res = await request(app).delete(`/posts/${post.id}`);
     
    
    expect(res.statusCode).toEqual(204);
    
    const deletedPost = await Post.findByPk(post.id);
    console.log(`Deleted post: ${deletedPost}`);
    expect(deletedPost).toBeNull();
  });
});

describe('GET /posts/search', () => {
  it('exibe postagem por consulta', async () => {
    await Post.create({
      title: 'Postagem Atualizada',
      content: 'Aqui é o conteúdo atualizado da postagem',
      author: 'O nome do autor atualizado'
    });
    const res = await request(app).get('/posts/search?q=postagem');
        
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('title', 'Postagem Atualizada');
  });
});