Projeto Bevi para Teste da entrevista
Projeto iniciado com Vite mais infomações react-vite.readme.md

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js 16+
- npm 8+ ou yarn 1.22+
- Git (opcional)

## Instalação e Execução

1. **Clone o repositório**:

git clone https://github.com/GuiBarros0/projetoBevi.git

cd Products-api-bevi

2. **Instale as dependências**:

npm install ou yarn dev

3. **Inicie o servidor de desenvolvimento**:
npm run dev ou yarn dev

##  Recursos Utilizados
- **React.js** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **React Router** - Navegação entre páginas
- **Lucide React** - Ícones
- **vite plugin svgr** - adicionar svg direto da pasta

### Testes
- **Vitest** - Devido a compatibilidade com Vite, foi usado Vitest para ter cobertura, porém os tests foi usado com base no Jest
- **Jest** - Framework de testes JavaScript
- **React Testing Library** - Testes de componentes React

# Estrutura de Arquivos

## Principais
Dentro da pasta `/src` está toda a estrutura base que se divide em:

- **Assets**: Arquivos estáticos como imagens e ícones
- **Components**: Todos os componentes da aplicação  
- **Hooks**: Hooks customizados criados para o projeto

Foi criado na raiz do /src o `UserContext` que provê informações globais necessárias para lidar com o sistema, incluindo a verificação de token e estado de autenticação, tambem contém a `API` que provê as requisições.

## Components
Contém todos os componentes necessários para montar as páginas:

### Login
- **Login**: Componente principal que gerencia o acesso ao sistema, mostrando as rotas e redirecionando usuários já autenticados
- **LoginForm**: Gerencia o formulário de login, fazendo a chamada para autenticar e validar o usuário

### UserContext
O componente principal que gerencia o estado global da aplicação. Ele permite:
- Fazer operações de login/logout
- Controlar a sessão do usuário
- Salvar o token no localStorage
- Prover esses dados para toda a aplicação

### Api
Módulo que centraliza todas as requisições em um único arquivo, contendo todos os endpoints configurados necessários para o sistema.

### Products
Pasta que lida com os produtos:

- **Feed**: Componente pai que gerencia a exibição dos produtos sendo ele o Pai
- **FeedProducts**: Faz a integração com a API para carregar os produtos e organizar sua exibição
- **FeedProductItem**: Responsável por renderizar visualmente cada produto individualmente
- **FeedModalEdit**: Modal que aparece ao clicar em um produto, mostrando suas informações e permitindo deletá-lo através do ID

### User
Pasta com componentes da área logada:

- **User**: Componente pai que gerencia o Header e menu de navegação
- **UserProductPost**: Responsável pelo CREATE - cadastro de novos produtos
- **UserProductEdit**: Gerencia o PUT - edição de produtos existentes, com sistema de busca por ID ou seleção na lista

### Forms
Fornece componentes reutilizáveis de formulário, usados tanto no login quanto na criação/edição de produtos sendo ele os inputs e botão.

### ElementInterface
Contém componentes utilitários:

- **Error**: Exibe mensagens de erro dos formulários
- **Loading**: Tela de carregamento
- **ProtectedRoute**: Controla o acesso às rotas protegidas da aplicação

## Hooks
Foram criados dois hooks customizados:

- **useForm**: Gerencia validações de formulários de forma reutilizável
- **useFetch**: Simplifica requisições HTTP, gerenciando automaticamente os dados retornados e estados de loading/error

## Teste
- **Use o Comando 'npm test' para iniciar os teste da pasta /src/tests/. Todos é para dar válido.

