# Guia de Configuração - Projeto NestJS com Prisma

## Visão Geral

Este projeto é uma API REST desenvolvida com **NestJS** e **Prisma ORM**, implementando um sistema de gerenciamento de usuários e contatos com relacionamento 1:N (um usuário pode ter múltiplos contatos).

## Estrutura do Banco de Dados

### Tabela: `usuario`
- `idusuario` (INT, Primary Key, Auto Increment)
- `nomeusuario` (VARCHAR 150)
- `emailusuario` (VARCHAR 150, Unique)
- `usuariosenha` (VARCHAR 255)
- `data_criacao` (TIMESTAMP)
- `data_atualizacao` (TIMESTAMP)

### Tabela: `contato`
- `idcontato` (INT, Primary Key, Auto Increment)
- `nomecontato` (VARCHAR 150)
- `telefonecontato` (VARCHAR 20)
- `emailcontato` (VARCHAR 150)
- `enderecocontato` (VARCHAR 255)
- `usuario_idusuario` (INT, Foreign Key)
- `data_criacao` (TIMESTAMP)
- `data_atualizacao` (TIMESTAMP)

## Pré-requisitos

- Node.js (v18+)
- npm ou yarn
- MySQL (v5.7+)

## Instalação

### 1. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure a URL do banco de dados:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/contato_db"
```

### 3. Criar o Banco de Dados

```bash
# Criar o banco de dados no MySQL
mysql -u root -p -e "CREATE DATABASE contato_db;"
```

### 4. Executar Migrações do Prisma

```bash
# Gerar o Prisma Client
npx prisma generate

# Executar as migrações
npx prisma migrate dev --name init
```

### 5. Iniciar a Aplicação

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run build
npm run start:prod
```

A aplicação estará disponível em `http://localhost:3000`

## Endpoints da API

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/users` | Criar um novo usuário |
| GET | `/users` | Listar todos os usuários |
| GET | `/users/:id` | Obter um usuário por ID |
| PATCH | `/users/:id` | Atualizar um usuário |
| DELETE | `/users/:id` | Deletar um usuário |

### Contatos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/contacts` | Criar um novo contato |
| GET | `/contacts` | Listar todos os contatos |
| GET | `/contacts/:id` | Obter um contato por ID |
| GET | `/contacts/usuario/:usuarioId` | Listar contatos de um usuário |
| PATCH | `/contacts/:id` | Atualizar um contato |
| DELETE | `/contacts/:id` | Deletar um contato |

## Exemplos de Requisições

### Criar Usuário

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "nomeusuario": "João Silva",
    "emailusuario": "joao@example.com",
    "usuariosenha": "senha123"
  }'
```

### Criar Contato

```bash
curl -X POST http://localhost:3000/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "nomecontato": "Maria Santos",
    "telefonecontato": "11999999999",
    "emailcontato": "maria@example.com",
    "enderecocontato": "Rua A, 123",
    "usuario_idusuario": 1
  }'
```

### Listar Contatos de um Usuário

```bash
curl http://localhost:3000/contacts/usuario/1
```

## Estrutura do Projeto

```
src/
├── prisma/
│   ├── prisma.service.ts      # Serviço centralizado do Prisma
│   └── prisma.module.ts       # Módulo do Prisma
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── contacts/
│   ├── dto/
│   │   ├── create-contact.dto.ts
│   │   └── update-contact.dto.ts
│   ├── entities/
│   │   └── contact.entity.ts
│   ├── contacts.controller.ts
│   ├── contacts.service.ts
│   └── contacts.module.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts

prisma/
└── schema.prisma              # Schema do Prisma
```

## Boas Práticas Implementadas

### 1. **Separação de Responsabilidades**
   - **Controllers**: Lidam apenas com requisições HTTP
   - **Services**: Contêm a lógica de negócio
   - **DTOs**: Validação e transformação de dados
   - **Prisma Service**: Centraliza a conexão com o banco

### 2. **Tratamento de Erros**
   - Exceções específicas do Prisma (P2002, P2025, P2003)
   - Mensagens de erro claras e informativas
   - Uso de `NotFoundException` e `BadRequestException` do NestJS

### 3. **Relacionamentos**
   - Relacionamento 1:N entre Usuário e Contato
   - Inclusão automática de dados relacionados nas respostas
   - Validação de chaves estrangeiras

### 4. **Timestamps**
   - `data_criacao`: Criado automaticamente
   - `data_atualizacao`: Atualizado automaticamente

### 5. **Modularização**
   - Cada entidade em seu próprio módulo
   - Módulo Prisma centralizado e reutilizável
   - Importação clara de dependências

## Comandos Úteis do Prisma

```bash
# Visualizar o schema no Prisma Studio
npx prisma studio

# Criar uma nova migração
npx prisma migrate dev --name nome_da_migracao

# Resetar o banco de dados (cuidado!)
npx prisma migrate reset

# Gerar o Prisma Client
npx prisma generate
```

## Testes

```bash
# Executar testes
npm run test

# Testes com cobertura
npm run test:cov

# Testes e2e
npm run test:e2e
```

## Melhorias Futuras Sugeridas

1. **Autenticação e Autorização**
   - Implementar JWT para autenticação
   - Adicionar roles e permissões

2. **Validação de Dados**
   - Usar `class-validator` e `class-transformer`
   - Validar emails e telefones

3. **Paginação**
   - Adicionar suporte a paginação nas listagens

4. **Filtros e Busca**
   - Implementar filtros avançados
   - Busca por nome, email, etc.

5. **Documentação API**
   - Integrar Swagger/OpenAPI

6. **Logs**
   - Implementar sistema de logs estruturado

7. **Caching**
   - Adicionar Redis para cache

## Troubleshooting

### Erro: "ECONNREFUSED" ao conectar ao MySQL
- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env`
- Verifique se o banco de dados foi criado

### Erro: "P2021" na migração
- Certifique-se de que o banco de dados existe
- Execute `npx prisma db push` para sincronizar o schema

### Erro: "Cannot find module '@prisma/client'"
- Execute `npm install` novamente
- Execute `npx prisma generate`

## Contato e Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato com a equipe de desenvolvimento.

---

**Última atualização**: Abril de 2026
