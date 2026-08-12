# Guia de Instalação – Node.js, NPM e Vite

## Pré-requisitos

- Sistema operacional: Windows 10+, macOS 10.15+, ou Linux
- Terminal/Prompt de comando

---

## 1. Instalar Node.js

A forma recomendada é usar o **NVM** (Node Version Manager), que permite trocar de versão facilmente.

### Windows

```powershell
# nvm-windows: https://github.com/coreybutler/nvm-windows
# Baixe e execute o instalador: nvm-setup.exe

# Após instalar o nvm, feche e reabra o terminal:
nvm install lts
nvm use lts
```

### macOS / Linux

```bash
# Instalar o nvm (confira a versão atual do instalador em github.com/nvm-sh/nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Reiniciar o terminal ou executar:
source ~/.bashrc  # ou ~/.zshrc no macOS com zsh

# Instalar e usar a versão LTS atual
nvm install --lts
nvm use --lts
nvm alias default 'lts/*'

# Verificar
node --version  # v22.x.x ou superior
npm --version
```

### Alternativa: Instalador Direto

Baixe em [nodejs.org](https://nodejs.org/). Escolha a versão **LTS**.

> ⚠️ O Node 18 encerrou o suporte em abril de 2025 e não é aceito pelas ferramentas
> atuais. Se a sua máquina ainda tem essa versão, atualize antes de seguir.

---

## 2. Instalar pnpm (opcional, recomendado)

```bash
# Instalar globalmente
npm install -g pnpm

# Verificar
pnpm --version
```

---

## 3. Criar um Projeto com Vite

```bash
# Com npm:
npm create vite@latest meu-projeto

# Com pnpm (mais rápido):
pnpm create vite meu-projeto

# Siga o assistente interativo:
# ✔ Select a framework: › Vanilla
# ✔ Select a variant:   › JavaScript

# Entrar no diretório
cd meu-projeto

# Instalar dependências
npm install
# ou: pnpm install

# Iniciar servidor de desenvolvimento
npm run dev
# ou: pnpm dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 4. Estrutura do Projeto Vanilla (Sem Framework)

```
meu-projeto/
├── public/
│   └── vite.svg          ← assets estáticos (não processados pelo Vite)
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── main.js           ← ponto de entrada JavaScript
│   └── style.css
├── index.html             ← template HTML
├── package.json
├── vite.config.js         ← configuração (opcional para projeto simples)
└── .gitignore
```

**index.html** – observe o `<script type="module">`:
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meu Projeto Vite</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- type="module" habilita ES Modules -->
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**src/main.js** – importando módulos:
```javascript
import './style.css'
import { criarApp } from './app.js'

criarApp(document.getElementById('app'))
```

---

## 5. Comandos Essenciais

```bash
# Desenvolvimento
npm run dev          # inicia servidor local (http://localhost:5173)

# Build de produção
npm run build        # gera /dist com arquivos otimizados

# Preview do build
npm run preview      # serve o /dist para testar localmente

# Instalar um pacote
npm install axios            # dependência de produção
npm install -D prettier      # dependência de desenvolvimento
npm install -D vitest        # para testes

# Remover um pacote
npm uninstall axios

# Atualizar pacotes
npm update
npm outdated         # ver pacotes desatualizados

# Ver scripts disponíveis
npm run
```

---

## 6. Projeto Exemplo: Lista de Tarefas Vanilla

Crie os seguintes arquivos no seu projeto Vite Vanilla:

### index.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lista de Tarefas</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### src/tarefas.js (módulo de dados)
```javascript
// Estado da aplicação (em um app real, seria um store ou contexto)
let tarefas = [
  { id: 1, texto: 'Aprender HTML', feita: true },
  { id: 2, texto: 'Dominar CSS', feita: false },
  { id: 3, texto: 'Praticar JavaScript', feita: false },
]

let proximoId = 4

export function obterTarefas() {
  return [...tarefas]  // retorna cópia
}

export function adicionarTarefa(texto) {
  if (!texto.trim()) throw new Error('Texto não pode ser vazio')
  const tarefa = { id: proximoId++, texto: texto.trim(), feita: false }
  tarefas.push(tarefa)
  return tarefa
}

export function alternarTarefa(id) {
  const tarefa = tarefas.find(t => t.id === id)
  if (!tarefa) throw new Error(`Tarefa ${id} não encontrada`)
  tarefa.feita = !tarefa.feita
  return tarefa
}

export function removerTarefa(id) {
  const antes = tarefas.length
  tarefas = tarefas.filter(t => t.id !== id)
  if (tarefas.length === antes) throw new Error(`Tarefa ${id} não encontrada`)
}

export function obterEstatisticas() {
  return {
    total:     tarefas.length,
    feitas:    tarefas.filter(t => t.feita).length,
    pendentes: tarefas.filter(t => !t.feita).length,
  }
}
```

### src/main.js
```javascript
import './style.css'
import {
  obterTarefas,
  adicionarTarefa,
  alternarTarefa,
  removerTarefa,
  obterEstatisticas,
} from './tarefas.js'

const app = document.getElementById('app')

function renderizar() {
  const tarefas = obterTarefas()
  const { total, feitas, pendentes } = obterEstatisticas()

  app.innerHTML = `
    <div class="container">
      <h1>📝 Lista de Tarefas</h1>
      <p class="stats">${total} total · ${feitas} feita(s) · ${pendentes} pendente(s)</p>

      <form id="form-nova">
        <input
          type="text"
          id="input-tarefa"
          placeholder="Nova tarefa..."
          autocomplete="off"
          aria-label="Nova tarefa"
          required
        >
        <button type="submit">Adicionar</button>
      </form>

      <ul id="lista">
        ${tarefas.map(t => `
          <li class="${t.feita ? 'feita' : ''}">
            <label>
              <input
                type="checkbox"
                ${t.feita ? 'checked' : ''}
                data-id="${t.id}"
                data-acao="alternar"
              >
              <span>${t.texto}</span>
            </label>
            <button
              data-id="${t.id}"
              data-acao="remover"
              aria-label="Remover tarefa"
              class="btn-remover"
            >✕</button>
          </li>
        `).join('')}
      </ul>
    </div>
  `

  // Eventos (após renderizar)
  document.getElementById('form-nova').addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.getElementById('input-tarefa')
    try {
      adicionarTarefa(input.value)
      input.value = ''
      renderizar()
    } catch (erro) {
      alert(erro.message)
    }
  })

  document.getElementById('lista').addEventListener('change', (e) => {
    if (e.target.dataset.acao === 'alternar') {
      alternarTarefa(Number(e.target.dataset.id))
      renderizar()
    }
  })

  document.getElementById('lista').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-acao="remover"]')
    if (btn) {
      removerTarefa(Number(btn.dataset.id))
      renderizar()
    }
  })
}

renderizar()
```

---

## 7. Deploy do Build

```bash
# Gerar build
npm run build

# O diretório /dist contém:
# dist/
# ├── index.html
# ├── assets/
# │   ├── index-a1b2c3.js    ← JS minificado com hash
# │   └── index-d4e5f6.css   ← CSS minificado com hash
```

**Serviços de deploy gratuitos:**

| Serviço | Comando | URL |
|---------|---------|-----|
| **Vercel** | `vercel deploy` | vercel.com |
| **Netlify** | Drag & drop do /dist | netlify.com |
| **GitHub Pages** | via GitHub Actions | pages.github.com |
| **Cloudflare Pages** | Integração com GitHub | pages.cloudflare.com |

```bash
# Deploy no Vercel (mais simples):
npm install -g vercel
vercel          # segue o wizard
vercel --prod   # deploy de produção
```

---

## Próximos Passos

1. ✅ Crie um projeto Vite e explore a estrutura
2. ✅ Divida o código em módulos ES separados
3. ✅ Experimente o HMR (edite um arquivo e veja a atualização instantânea)
4. ✅ Gere um build de produção e analise o /dist
5. 🎯 Adicione TypeScript ao projeto
6. 🎯 Configure o ESLint e Prettier
7. 🎯 Adicione testes com Vitest
8. 🎯 Faça deploy no Vercel ou Netlify
