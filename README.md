# Fastify API

Este projeto é uma aplicação de estudo utilizando o framework [Fastify](https://www.fastify.io/), com o objetivo de explorar suas funcionalidades e desempenho no desenvolvimento de APIs.

## Sumário

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos Local](#pré-requisitos-local)
  - [1. Instalação das Dependências](#instalação-das-dependências)
  - [2. Configuração do Ambiente](#configuração-do-ambiente)
- [Pré-requisitos Docker](#pré-requisitos-docker)

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
- **prisma/**: Diretório relacionado ao [Prisma ORM](https://www.prisma.io/), utilizado para interações com o banco de dados.
- **.env**: Arquivo de variáveis de ambiente para configurações sensíveis.
- **package.json**: Gerencia as dependências e scripts do projeto.
- **tsconfig.json**: Configurações do TypeScript.

## Tecnologias Utilizadas

- [PostgreSQL](https://www.postgresql.org/): Sistema de gerenciamento de banco de dados relacional.
- [Prisma](https://www.prisma.io/): ORM (Object-Relational Mapping) moderno para TypeScript e Node.js.
- [Zod](https://zod.dev/): Biblioteca de validação de esquemas para TypeScript e JavaScript.
- [TypeScript](https://www.typescriptlang.org/): Linguagem de programação fortemente tipada que se baseia em JavaScript, oferecendo melhores ferramentas em qualquer escala.

## Pré-requisitos Local

- [Node.js](https://nodejs.org/) instalado (versão 20 ou superior).
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli) instalado globalmente:

**Importante:**  
Para rodar a aplicação localmente, é necessário possuir uma instância do PostgreSQL para estabelecer a conexão com a aplicação.

- npm
  ```bash
  npm install -g prisma
- pnpm 
    ```bash
    pnpm install --global prisma
- yarn 
    ```bash
    yarn global add prisma
### Instalação das Dependências
Dependendo do gerenciador de pacotes de sua preferência, utilize um dos comandos abaixo:

- npm
    ```bash
    npm i
- pnpm 
    ```bash
    pnpm install
- yarn 
    ```bash
    yarn
### Configuração do Ambiente
1. Crie o arquivo `.env` na raiz do projeto e configure as variáveis de ambiente conforme necessário:

    ```ini
    # Porta em que a aplicação será executada (padrão: 8080)
    PORT=8080

    # Caminho base para as rotas da API (padrão: "api/v1")
    PATH_API=api/v1

    # URL de conexão com o banco de dados PostgreSQL (substitua pelos seus dados)
    DATABASE_URL=postgresql://fastify_api:fastify123@fastify_app_db:5432/mydb?schema=fastify_api
    ```
2. Execute as migrações do banco de dados com o Prisma:
   
    ```bash
    prisma migrate dev
3. Inicie o servidor em modo de desenvolvimento:

- npm
    ```bash
    npm run start:dev
- pnpm 
    ```bash
    pnpm start:dev
- yarn 
    ```bash
    yarn start:dev
## Pré-requisitos Docker

Para executar a aplicação utilizando Docker, é necessário ter instalado:

- [Docker](https://www.docker.com/get-started) (versão 20.10 ou superior);
- [Docker Compose](https://docs.docker.com/compose/) (caso o seu Docker não o inclua automaticamente).

**Passos para executar a aplicação com Docker:**

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/gribeiros/fastify-api.git
   cd fastify-api

2. **Verifique se as portas que serão utilizadas pelo container já não estão sendo utilizadas. Para verificar ou alterá-las, abra o arquivo `docker-compose.yml`.**

3. **Execute o comando abaixo para construir a imagem e iniciar a aplicação junto com os serviços definidos (como o banco de dados, se configurado via Docker Compose):**
    ```bash
    docker-compose up --build -d