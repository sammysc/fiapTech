
# Plataforma Educacional FIAP Tech Challenge 

Este  backend faz parte da avaliação da pós Tech da FIAP.
A aplicação é uma plataforma onde professores podem postar suas aulas e transmitir conhecimento para alunos de forma prática, centralizada e tecnológica.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- PostgreSQL
- SQLite (para testes)
- Swagger (para documentação da API)
- Jest (para testes unitários)
- Supertest (para testes de integração)
- Docker (para containerização)
- GitHub Actions (para CI/CD)

## Instalação
1-Clone o repositório:
git  clone  https://github.com/sammysc/fiapTech.git

2- Instale as dependências:
npm install

3- Configure o banco de dados no arquivo config/config.json

4- Execute as migrações do banco de dados:
npx sequelize-cli db:migrate

## Executando o Servidor
Para  iniciar  o  servidor  em  modo  de  desenvolvimento,  execute:
npm  run  dev
O  servidor  estará  rodando  em  http://localhost:3000

## Endpoints da API
1. Listar Postagens
GET  /posts

2. Ler  Post  por  ID
GET  /posts/:id
3.  Criar  Post
POST  /posts
4. Editar  Post
PUT /posts?{id }
5. Excluir  Post
 DELETE  /posts/:id
6. Buscar  Posts
GET  /posts/search?q=<termo_de_busca>

## Documentação da API
A  documentação  da  API  está  disponível  em:

  

http://localhost:3000/api-docs

## Testes
Para  rodar  os  testes,  execute:
npm  test
## Docker
Para  construir  e  rodar  o  container  Docker,  execute:
 docker  build  -t  plataforma-educacional  .
docker  run  -p  3000:3000  plataforma-educacional
## CI/CD
Este  projeto  utiliza  GitHub  Actions  para  CI/CD.  O  workflow  está  configurado  no  arquivo  node.js.yml.
