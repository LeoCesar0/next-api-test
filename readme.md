

# App de Teste para Erick Wendel


## Estrutura

src/server/routes - Folder para as rotas do backend
src/server/services - Folder para algumas lógicas principais
src/pages/index - Home Page
src/pages/api/reports - Rota da api
tests - Folder para testes
db - Folder para banco de dados mockado3
public/test/transaction.pdf - Arquivo PDF para teste


## Explicação

O app foi criado rapidamente com o intuito de simular uma aplicação real onde o usuário insere um arquivo de transações bancárias.
O sistema então extrai as informações das transações para criar um relatório daquele extrato com as informações: 
- Total de saída (expenses)
- Total de entrada (deposit)
- Saldo final (finalBalance)


## Objetivo

Esclarecer o processo de testes em um framework Fullstack como o Next.js, envolvendo upload de arquivos etc.
Ficando totalmente aberto a qualquer refatoração de código, reestruturação, sugestão etc.

## Start do projeto

```pnpm dev```