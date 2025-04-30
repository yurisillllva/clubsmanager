# Clubs Manager - Sistema de Gerenciamento de Clubes

O Clubs Manager é uma aplicação web completa para gerenciamento de clubes de futebol, permitindo o cadastro, consulta, atualização e exclusão de registros. Desenvolvida com arquitetura moderna, a aplicação separa claramente as responsabilidades entre frontend e backend, seguindo boas práticas de desenvolvimento como DDD (Domain-Driven Design) e RESTful APIs.

Documentação da API:

https://documenter.getpostman.com/view/19872017/2sB2j3CC2S

Funcionalidades Principais:

- CRUD Completo: Crie, liste, atualize e exclua clubes de forma intuitiva.

- Busca e Paginação: Encontre clubes por nome com paginação de 7 registros por página.

- Datas Automáticas: Registro automático da data de criação (não editável).

- Validação de Email Único: Impede cadastro duplicado de emails, com feedback claro ao usuário.

- Formulários Responsivos: Interface adaptável com máscaras para telefone e validação em tempo real.

Tecnologias Utilizadas

Frontend:

React	Biblioteca JavaScript para construção de interfaces reativas.

React Bootstrap	Componentes UI estilizados com Bootstrap v4.5.

Axios	Cliente HTTP para consumo da API do backend.

date-fns	Biblioteca para formatação de datas.

React Input Mask	Máscara para campos de telefone no formato brasileiro.

Backend:
Tecnologia	Descrição

Node.js	Ambiente de execução JavaScript server-side.

Express	Framework para construção de APIs RESTful.

Sequelize	ORM para interação com PostgreSQL e modelagem de dados.

PostgreSQL	Banco de dados relacional para armazenamento persistente.

Joi	Validação de dados de entrada com mensagens customizadas.

CORS	Middleware para segurança em comunicações entre frontend/backend.

Testes:

Testes os chamados de integração da api, com o Postman.

Jest	Framework para testes unitários e de integração.

Supertest	Simulação de requisições HTTP para testes de endpoints.


## Pré-requisitos
- Node.js 16+
- PostgreSQL 12+
- NPM 8+

## Configuração Inicial

### 1. Banco de Dados
```sql
CREATE DATABASE clubes_futebol;
CREATE USER club_user WITH PASSWORD 'senha_segura';
GRANT ALL PRIVILEGES ON DATABASE clubes_futebol TO club_user;
```

### 2. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do backend:
```env
DB_NAME=clubes_futebol
DB_USER=club_user
DB_PASSWORD=senha_segura
DB_HOST=localhost
DB_PORT=5432
PORT=3001
```

### 3. Instalação de Dependências
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Execução do Sistema

### Iniciar Backend
```bash
cd backend
npm run migrate # Executar migrations
npm start
```

### Iniciar Frontend
```bash
cd frontend
npm start
```

## Testes Unitários

### Configurar Ambiente de Testes
Crie um arquivo `.env.test` na raiz do backend:
```env
DB_NAME=clubes_futebol_test
DB_USER=club_user_test
DB_PASSWORD=senha_teste
DB_HOST=localhost
DB_PORT=5432
```
Rode as migrations do banco de teste
```bash
npm run test:migrate 
```

Forçar a configuração manualmente
```bash
npx sequelize-cli db:migrate --env test --config config/databaseTest.js
```

### Executar Testes
```bash
cd backend
npm test
```


## Scripts Disponíveis

### Backend
- `start`: Inicia o servidor
- `migrate`: Executa as migrations
- `test`: Executa os testes unitários

### Frontend
- `start`: Inicia o servidor de desenvolvimento
- `build`: Cria versão de produção
- `test`: Executa testes do React

### Práticas Adotadas
Separação de Camadas: Divisão clara entre controllers, services e repositories.

Validação Dupla: Schemas no frontend (React) e backend (Joi).

Segurança: Headers CORS configurados e sanitização de dados.

### Melhorias Implementadas

Performance:

Pool de conexões configurado

Índices nas colunas de pesquisa

Paginação server-side

Escalabilidade:

Arquitetura em camadas

Separação clara de responsabilidades

Tratamento adequado de erros

UX:

Pesquisa em tempo real

Paginação com feedback visual

Load automático ao navegar

Formulários responsivos

Boas Práticas:

Validação Joi

Variáveis de ambiente

Migrations versionadas

Documentação completa