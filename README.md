# sports Manager - Sistema de Gestão para sports

## 📝 Descrição do Projeto

O sports Manager é um sistema web moderno para gerenciamento de produtos de esportivos, desenvolvido para simplificar o controle de estoque e cadastro de itens. A aplicação oferece:

- Interface intuitiva e responsiva
- CRUD completo de produtos (Create, Read, Update, Delete)
- Validação de formulários em tempo real
- Confirmações visuais para ações importantes
- Design otimizado para desktop e mobile

## 💻 Recursos Utilizados

### Frontend
- **React.js** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **React Router** - Navegação entre páginas
- **Lucide React** - Ícones
- **fetch** - HTTP para consumo de APIs
- **Hooks Customizados** - Lógica reutilizável (useForm, useFetch)
- **vite plugin svgr** - adicionar svg direto da pasta

### Testes
- **Jest** - Framework de testes JavaScript
- **React Testing Library** - Testes de componentes React

### Controle de Versão
- **Git** - Controle de versão distribuído
- **GitHub** - Hospedagem de repositório


## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js 16+
- npm 8+ ou yarn 1.22+
- Git (opcional)

## 🚀 Instalação e Execução

1. **Clone o repositório**:
```bash
git clone https://github.com/GuiBarros0/Products-api-bevi.git
cd Products-api-bevi

Instale as dependências:

npm install
# ou
yarn dev

4. Inicie o servidor de desenvolvimento:
npm run dev
# ou
yarn dev

📂 Estrutura de Arquivos
src/
├── assets/          # Ícones e imagens
├── components/      # Componentes reutilizáveis
│   ├── Forms/       # Componentes de formulário
│   └── login/          # Elementos de interface
│   └── products/          # Elementos de interface
│   └── users/          # Elementos de interface
├── hooks/           # Hooks customizados
├── api/             # Configurações da API
├── App.jsx          # Componente raiz
└── main.jsx         # Ponto de entrada
