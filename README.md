# Fastify API

Este projeto é uma aplicação de estudo utilizando o framework [Fastify](https://www.fastify.io/), com o objetivo de explorar suas funcionalidades e desempenho no desenvolvimento de APIs.

## Sumário

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação das Dependências](#instalação-das-dependências)
- [Configuração do Ambiente](#configuração-do-ambiente)

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

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 20 ou superior).
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli) instalado globalmente:

- npm
    ```bash
    npm install -g prisma
- pnpm 
    ```bash
    pnpm install --global prisma
- yarn 
    ```bash
    yarn global add prisma
## Instalação das Dependências
Dependendo do gerenciador de pacotes de sua preferência, utilize um dos comandos abaixo:
- npm
    ```bash
    npm install
- pnpm 
    ```bash
    pnpm install
- yarn 
    ```bash
    yarn
## Configuração do Ambiente
1. Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente conforme necessário:

- **PORT**: Porta em que a aplicação será executada (padrão: 8080).

- **PATH_API**: Caminho base para as rotas da API (padrão: "api/v1").

- **DATABASE_URL**: URL de conexão com o banco de dados PostgreSQL. Exemplo:

2. Execute as migrações do banco de dados com o Prisma:
   
    ```bash
    prisma migrate dev
3. Inicie o servidor em modo de desenvolvimento:

- npm
    ```bash
    npm start:dev
- pnpm 
    ```bash
    pnpm start:dev
- yarn 
    ```bash
    yarn start:dev