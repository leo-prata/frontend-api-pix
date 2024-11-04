# Frontend API Pix

Este é um projeto React configurado com Vite.

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/leo-prata/frontend-api-pix.git
2. Navegue até o diretório do projeto:
   ```sh
   cd backend-api-pix
3. Instale as dependências:
    ```sh
    npm install

## Rodando o servidor

### Modo de Desenvolvimento
Para rodar o servidor em modo de desenvolvimento, utilize o script dev:
    
  
    npm run dev


## Variáveis de Ambiente
Para rodar este projeto, você precisará configurar as seguintes variáveis de ambiente no arquivo .env na raiz do projeto:

- VITE_API_URL: Para usar juntamente com o backend na sua própria maquina utilize 'http://localhost:3111'

O tipo FirebaseConfig é uma interface que especifica que o objeto deve conter sete propriedades: apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId e measurementId, todas do tipo string. Essas informações podem ser encontradas no seu próprio projeto no Firebase / Firestore

- VITE_API_KEY
- VITE_AUTH_DOMAIN
- VITE_PROJECT_ID
- VITE_STORAGE_BUCKET
- VITE_MESSAGING_SENDER_ID
- VITE_APP_ID
- VITE_MEASUREMENT_ID
- VITE_MERCADOPAGO_TOKEN


