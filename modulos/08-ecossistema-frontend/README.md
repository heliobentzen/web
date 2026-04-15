# Módulo 08 – Ecossistema Front-End e Bundlers (Vite)

## Objetivos

Ao final deste módulo você será capaz de:

- Compreender o ecossistema JavaScript moderno
- Entender o papel de Node.js, NPM e gerenciadores de pacotes
- Configurar e usar o Vite como bundler/dev server
- Entender o que é bundling, tree-shaking e code splitting
- Configurar um projeto front-end moderno do zero
- Entender módulos ES e as diferenças para CommonJS

---

## 1. Node.js e NPM

**Node.js** é um runtime JavaScript baseado no motor V8 do Chrome que permite executar JavaScript fora do navegador. É a base do ecossistema de ferramentas front-end.

**NPM** (Node Package Manager) é o gerenciador de pacotes padrão do Node.js.

```bash
# Verificar versões
node --version    # v20.x.x
npm --version     # 10.x.x

# Usar NVM para gerenciar versões do Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20    # instala Node 20 LTS
nvm use 20        # usar Node 20
nvm alias default 20  # definir como padrão
```

### Gerenciadores de Pacotes Alternativos

| Gerenciador | Comando | Destaque |
|-------------|---------|---------|
| npm | `npm install` | Padrão, incluído com Node.js |
| **pnpm** | `pnpm install` | Rápido, eficiente em disco (recomendado!) |
| yarn | `yarn install` | Popular, alternativa madura |
| bun | `bun install` | Extremamente rápido (runtime + bundler) |

---

## 2. package.json

O arquivo `package.json` é o coração de qualquer projeto Node.js/front-end.

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Projeto de exemplo",
  "type": "module",
  "scripts": {
    "dev":     "vite",
    "build":   "vite build",
    "preview": "vite preview",
    "lint":    "eslint src",
    "format":  "prettier --write src",
    "test":    "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^9.9.0",
    "prettier": "^3.3.3",
    "vite": "^5.4.2",
    "vitest": "^2.0.5"
  }
}
```

**Campos importantes:**
- `"type": "module"` – usa ES Modules por padrão (`.js` = ESM)
- `dependencies` – pacotes necessários em produção
- `devDependencies` – pacotes apenas para desenvolvimento
- `scripts` – comandos executáveis com `npm run`

### Versionamento Semântico (SemVer)

```
v2.4.1
  │ │ └── Patch: correção de bugs (compatível)
  │ └──── Minor: novas funcionalidades (compatível)
  └────── Major: mudanças incompatíveis (breaking changes)

Prefixos no package.json:
"react": "^18.3.1"   ← ^ permite updates de minor/patch (18.x.x)
"react": "~18.3.1"   ← ~ permite apenas updates de patch (18.3.x)
"react": "18.3.1"    ← sem prefixo = versão exata
```

---

## 3. Módulos ES (ESM)

```javascript
// ── Exportação ──

// Exportação nomeada
export const PI = 3.14159
export function calcularArea(r) { return PI * r ** 2 }
export class Circulo { /* ... */ }

// Exportação padrão (uma por arquivo)
export default function principal() { /* ... */ }

// Exportação combinada
const velocidade = 299_792_458
export { velocidade }
export { velocidade as VELOCIDADE_LUZ }  // renomear ao exportar

// ── Importação ──

// Nomeadas
import { PI, calcularArea } from './matematica.js'

// Padrão
import principal from './app.js'

// Renomear ao importar
import { calcularArea as area } from './matematica.js'

// Tudo como namespace
import * as Mat from './matematica.js'
Mat.calcularArea(5)

// Importação dinâmica (lazy loading)
const modulo = await import('./pesado.js')
// ou
import('./pesado.js').then(m => m.iniciar())

// Re-exportação (barrel exports)
// index.js
export { Button } from './Button.js'
export { Input }  from './Input.js'
export { Modal }  from './Modal.js'
// Uso: import { Button, Input } from './components'
```

**ESM vs CommonJS:**

```javascript
// ESM (moderno – use este!)
import fs from 'node:fs'
export const config = {}

// CommonJS (Node.js legado)
const fs = require('fs')
module.exports = { config: {} }
```

---

## 4. Vite

**Vite** (pronuncia-se "vit", francês para "rápido") é um bundler/dev server moderno criado por Evan You (criador do Vue.js). É o padrão de facto para projetos React, Vue, Svelte e Vanilla JS modernos.

### Por que Vite é rápido?

```
TRADICIONAL (Webpack):
┌─────────────────────────────────────┐
│  Analisa TODOS os módulos primeiro  │
│  Transforma em um bundle grande     │
│  Só então inicia o servidor         │
│  → Startup lento em projetos grandes│
└─────────────────────────────────────┘

VITE:
┌─────────────────────────────────────┐
│  Serve arquivos sob demanda (ESM)   │
│  Transpila apenas o que é pedido    │
│  → Startup instantâneo!             │
│  HMR (Hot Module Replacement) rápido│
└─────────────────────────────────────┘
```

### 4.1 Criando um Projeto com Vite

```bash
# Criar projeto interativamente
npm create vite@latest meu-projeto

# Ou especificando template:
npm create vite@latest meu-react-app -- --template react
npm create vite@latest meu-vue-app   -- --template vue
npm create vite@latest meu-vanilla   -- --template vanilla

# Templates disponíveis:
# vanilla, vanilla-ts
# react, react-ts, react-swc, react-swc-ts
# vue, vue-ts
# svelte, svelte-ts
# preact, preact-ts
# lit, lit-ts

# Instalar dependências e rodar
cd meu-projeto
npm install
npm run dev     # → http://localhost:5173
```

### 4.2 Estrutura de Projeto Vite (React)

```
meu-projeto/
├── public/              ← arquivos estáticos (não processados)
│   └── favicon.svg
├── src/                 ← código fonte
│   ├── assets/          ← imagens, fontes, etc.
│   │   └── logo.svg
│   ├── components/      ← componentes reutilizáveis
│   │   ├── Button.jsx
│   │   └── Modal.jsx
│   ├── pages/           ← páginas/rotas
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── App.jsx          ← componente raiz
│   ├── App.css
│   ├── main.jsx         ← ponto de entrada
│   └── index.css        ← estilos globais
├── index.html           ← template HTML (ponto de entrada do Vite)
├── package.json
├── vite.config.js       ← configuração do Vite
└── .gitignore
```

### 4.3 Configuração do Vite (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],

  // Servidor de desenvolvimento
  server: {
    port: 3000,
    open: true,  // abre navegador automaticamente
    cors: true,
    proxy: {
      // Redirecionar /api para outro servidor (evitar CORS)
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // Aliases (evitar ../../ no import)
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
    },
  },

  // Build de produção
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Code splitting manual
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

  // Variáveis de ambiente
  // Acesso via: import.meta.env.VITE_API_URL
  // Arquivo: .env, .env.development, .env.production
})
```

### 4.4 Variáveis de Ambiente

```bash
# .env
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=Minha Aplicação

# .env.production
VITE_API_URL=https://api.meusite.com
```

```javascript
// Acessar no código
const apiUrl = import.meta.env.VITE_API_URL
const isProd = import.meta.env.PROD     // boolean
const isDev  = import.meta.env.DEV      // boolean
const mode   = import.meta.env.MODE     // 'development' | 'production'
const base   = import.meta.env.BASE_URL // '/'
```

> ⚠️ Apenas variáveis com prefixo `VITE_` são expostas ao código do navegador!

---

## 5. Build e Otimizações

```bash
npm run build       # gera /dist com assets otimizados
npm run preview     # serve o /dist localmente para testar

# Analisar o bundle
npm install -D rollup-plugin-visualizer
# (adicionar ao vite.config.js)
# → gera stats.html com gráfico do bundle
```

**O que o build faz:**
- **Bundling**: une múltiplos arquivos em poucos
- **Minificação**: remove espaços, encurta nomes (terser para JS, lightningcss para CSS)
- **Tree-shaking**: remove código importado mas não usado
- **Code splitting**: divide em chunks para lazy loading
- **Asset hashing**: `styles.a1b2c3.css` (cache busting)
- **Inlining**: arquivos pequenos inline como base64

---

## 6. Ferramentas do Ecossistema

### Linting e Formatação

```bash
# ESLint – encontra problemas no código
npm install -D eslint @eslint/js
npx eslint src/

# Prettier – formata o código automaticamente
npm install -D prettier
echo '{}' > .prettierrc
npx prettier --write src/

# Integração ESLint + Prettier
npm install -D eslint-config-prettier
```

### TypeScript

```bash
# Adicionar TypeScript a um projeto Vite existente
npm install -D typescript @types/node

# tsconfig.json já vem com o template typescript do Vite
npm create vite@latest meu-projeto -- --template react-ts
```

### Testes

```bash
# Vitest – testes unitários (compatível com Vite)
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Playwright – testes end-to-end (E2E)
npm install -D @playwright/test
npx playwright install
```

---

## 7. Projeto Prático – Passo a Passo

### 7.1 Criar um projeto Vite + React do zero

```bash
# 1. Criar projeto
npm create vite@latest lista-tarefas -- --template react
cd lista-tarefas

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run dev
```

### 7.2 Estrutura do projeto Lista de Tarefas

```javascript
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

```javascript
// src/App.jsx
import { useState } from 'react'
import './App.css'

export default function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Aprender HTML semântico', feita: true },
    { id: 2, texto: 'Dominar CSS Grid e Flexbox', feita: false },
    { id: 3, texto: 'Praticar JavaScript', feita: false },
  ])
  const [novaTarefa, setNovaTarefa] = useState('')

  function adicionarTarefa(e) {
    e.preventDefault()
    if (!novaTarefa.trim()) return
    setTarefas(prev => [...prev, {
      id: Date.now(),
      texto: novaTarefa.trim(),
      feita: false,
    }])
    setNovaTarefa('')
  }

  function alternarTarefa(id) {
    setTarefas(prev => prev.map(t =>
      t.id === id ? { ...t, feita: !t.feita } : t
    ))
  }

  function removerTarefa(id) {
    setTarefas(prev => prev.filter(t => t.id !== id))
  }

  const pendentes  = tarefas.filter(t => !t.feita).length
  const concluidas = tarefas.filter(t => t.feita).length

  return (
    <div className="app">
      <h1>📝 Lista de Tarefas</h1>
      <p>{pendentes} pendente(s) · {concluidas} concluída(s)</p>

      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          value={novaTarefa}
          onChange={e => setNovaTarefa(e.target.value)}
          placeholder="Nova tarefa..."
          aria-label="Nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id} className={tarefa.feita ? 'feita' : ''}>
            <label>
              <input
                type="checkbox"
                checked={tarefa.feita}
                onChange={() => alternarTarefa(tarefa.id)}
              />
              {tarefa.texto}
            </label>
            <button
              onClick={() => removerTarefa(tarefa.id)}
              aria-label={`Remover "${tarefa.texto}"`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## 8. Comparativo de Bundlers

| Ferramenta | Velocidade | Ecossistema | Config | Uso Ideal |
|-----------|-----------|-------------|--------|-----------|
| **Vite** | ⚡⚡⚡ | Grande | Mínima | Novos projetos (recomendado) |
| **webpack** | ⚡ | Enorme | Complexa | Projetos legados, casos edge |
| **esbuild** | ⚡⚡⚡⚡ | Médio | Simples | Build rápido, plugins custom |
| **Parcel** | ⚡⚡ | Médio | Zero | Projetos simples, protótipos |
| **Rollup** | ⚡⚡ | Grande | Moderada | Bibliotecas (usado pelo Vite) |
| **Turbopack** | ⚡⚡⚡ | Crescendo | Moderada | Next.js |

---

## Práticas

| # | Arquivo | Descrição |
|---|---------|-----------|
| 01 | [guia-instalacao.md](praticas/01-guia-instalacao.md) | Guia passo a passo: Node.js + Vite + primeiro projeto |
| 02 | [modulos-es.html](praticas/02-modulos-es.html) | Experimentar módulos ES nativamente no navegador |

---

## Referências

- [Vite – Documentação oficial](https://vitejs.dev/)
- [NPM – npmjs.com](https://www.npmjs.com/)
- [pnpm – pnpm.io](https://pnpm.io/)
- [JavaScript Modules – MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules)
- [Node.js – nodejs.org](https://nodejs.org/)
- [State of JS 2024](https://stateofjs.com/)
- [Awesome Vite – github.com](https://github.com/vitejs/awesome-vite)
