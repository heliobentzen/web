# Módulo 08 — Ecossistema Front-End

> Até aqui você abriu arquivos com duplo clique. Agora entra o ferramental que sustenta um projeto real: módulos, dependências, servidor de desenvolvimento e build de produção.

| | |
| --- | --- |
| **Carga horária** | 10 h (4 h expositivas + 6 h de prática) |
| **Pré-requisito** | [Módulo 07 — DevTools](../07-devtools/README.md) |
| **Prática integrada** | [Módulo 08 — Ecossistema Front-end](../../pratica_ecossistema_frontend/README.md) |
| **Práticas** | [`praticas/`](praticas/) |

---

## Objetivos de aprendizagem

Ao final deste módulo, você será capaz de:

1. **Instalar** e gerenciar versões do Node.js com um gerenciador de versões.
2. **Interpretar** o `package.json`, incluindo versionamento semântico e o papel do lockfile.
3. **Organizar** código em módulos ES com importação e exportação.
4. **Justificar** por que um projeto precisa de servidor de desenvolvimento e bundler.
5. **Criar e executar** um projeto com Vite, do desenvolvimento ao build de produção.
6. **Diagnosticar** os erros mais comuns de ambiente e dependências.

---

## Roteiro

```text
1. O problema que o ferramental resolve   ← motivação antes da ferramenta
        ↓
2. Node.js e npm
        ↓
3. package.json e dependências
        ↓
4. Módulos ES                  ← import / export
        ↓
5. Por que um servidor de desenvolvimento
        ↓
6. Vite: dev e build
        ↓
7. Estrutura de projeto
        ↓
8. Publicação
        ↓
9. Caminho para frameworks
```

---

## 1. O problema que o ferramental resolve

Nos módulos anteriores, abrir o HTML com duplo clique bastava. Isso deixa de funcionar
quando o projeto cresce. Quatro problemas concretos aparecem:

| Problema | Sintoma | O que resolve |
| --- | --- | --- |
| Um único arquivo JS gigante | Impossível de navegar e manter | Módulos ES |
| Reutilizar código de terceiros | Copiar e colar arquivos manualmente | npm |
| `file://` bloqueia recursos | `import` falha, CORS bloqueia `fetch`, Service Worker não roda | Servidor de desenvolvimento |
| Muitos arquivos em produção | Site lento por excesso de requisições | Build (bundler) |

Você já encontrou o terceiro no [Módulo 01](../01-arquitetura-web/README.md): recursos que
exigem contexto seguro não funcionam em `file://`.

> **Experimente:** crie dois arquivos, `soma.js` com `export function soma(a,b){return a+b}`
> e um HTML com `<script type="module" src="soma.js">`. Abra com duplo clique. O console
> mostra um erro de CORS. Esse é o problema que o servidor de desenvolvimento resolve.

---

## 2. Node.js e npm

**Node.js** executa JavaScript fora do navegador. No front-end, ele não roda o seu site —
ele roda as **ferramentas** que preparam o seu site: servidor de desenvolvimento, build,
linter, testes.

**npm** (*Node Package Manager*) vem junto e faz três coisas: instala pacotes, registra
dependências e executa scripts.

### 2.1 Versões

```bash
node --version    # v22.x.x ou superior
npm --version
```

Use sempre uma versão **LTS** (*Long Term Support*) — são as de numeração par, com suporte
estendido. Versões ímpares são experimentais e não devem ser usadas em projeto real.

O Node 18 chegou ao fim do suporte em abril de 2025; se a sua máquina ainda tem essa
versão, atualize antes de continuar — as ferramentas atuais já não a aceitam.

### 2.2 Instale com um gerenciador de versões

Projetos diferentes exigem versões diferentes de Node. Um gerenciador permite alternar sem
reinstalar:

```bash
# nvm (macOS/Linux) — no Windows, use nvm-windows
nvm install --lts
nvm use --lts
nvm alias default lts/*
```

O passo a passo completo por sistema operacional está no
[Guia de instalação](praticas/01-guia-instalacao.md).

### 2.3 Gerenciadores de pacote

| Gerenciador | Observação |
| --- | --- |
| **npm** | Já vem com o Node. É o que usaremos no curso. |
| **pnpm** | Mais rápido e econômico em disco; compartilha pacotes entre projetos |
| **yarn** | Ainda comum em projetos legados |

Todos leem o mesmo `package.json`. **Não misture dois no mesmo projeto**: cada um gera seu
próprio lockfile, e ter dois é fonte garantida de inconsistência.

---

## 3. `package.json` e dependências

O `package.json` é a identidade do projeto. Crie com `npm init -y`.

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^7.0.0"
  }
}
```

| Campo | Função |
| --- | --- |
| `name` | Identificador do projeto |
| `type: "module"` | Ativa a sintaxe `import`/`export` nos arquivos `.js` |
| `private: true` | Impede publicação acidental no npm |
| `scripts` | Atalhos executáveis com `npm run` |
| `dependencies` | Pacotes que vão para produção |
| `devDependencies` | Pacotes usados só no desenvolvimento |

A distinção importa: o Vite é `devDependency` porque produz o build, mas não é enviado ao
usuário. Uma biblioteca de gráficos usada na página é `dependency`.

### 3.1 Instalando

```bash
npm install                   # instala tudo que está no package.json
npm install vite --save-dev   # adiciona como dependência de desenvolvimento
npm install chart.js          # adiciona como dependência de produção
npm uninstall chart.js
npm outdated                  # lista pacotes desatualizados
npm audit                     # verifica vulnerabilidades conhecidas
```

### 3.2 Versionamento semântico

```text
    ^7.2.14
    │ │ │ └── patch — correção de bug, compatível
    │ │ └──── minor — recurso novo, compatível
    │ └────── major — mudança que quebra compatibilidade
    └──────── faixa aceita na atualização
```

| Notação | Aceita | Uso |
| --- | --- | --- |
| `^7.2.14` | 7.x.x — minor e patch | Padrão recomendado |
| `~7.2.14` | 7.2.x — só patch | Mais conservador |
| `7.2.14` | Exatamente essa | Máximo controle |

### 3.3 O lockfile

O `package-lock.json` registra a versão **exata** de cada pacote e de cada dependência
delas. É o que garante que sua máquina, a do colega e o servidor instalem exatamente a
mesma coisa.

**Sempre versione o lockfile no Git.** Nunca o edite à mão.

```bash
npm ci      # instala exatamente o lockfile — use em CI/CD e para reproduzir o ambiente
```

### 3.4 `node_modules` nunca vai para o Git

```gitignore
node_modules/
dist/
.env
```

A pasta `node_modules` costuma ter dezenas de milhares de arquivos e é integralmente
reconstruível com `npm install`. Versioná-la torna o repositório inutilizável.

### 3.5 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "format": "prettier --write src"
  }
}
```

```bash
npm run dev
npm run build
```

Scripts documentam o projeto: quem clona o repositório descobre como rodá-lo sem
perguntar a ninguém.

---

## 4. Módulos ES

Módulos permitem dividir o código em arquivos com fronteiras explícitas.

```javascript
// matematica.js
export function somar(a, b) {
  return a + b
}

export const PI = 3.14159

// exportação padrão: uma por arquivo
export default function calcular(operacao, a, b) {
  return operacao === 'soma' ? somar(a, b) : null
}
```

```javascript
// main.js
import calcular, { somar, PI } from './matematica.js'
import { somar as adicionar } from './matematica.js'   // renomeando
import * as matematica from './matematica.js'          // tudo em um objeto

console.log(somar(2, 3))
console.log(matematica.PI)
```

Regras que causam erro na primeira vez:

- **A extensão é obrigatória** no navegador: `'./matematica.js'`, não `'./matematica'`.
  (O Vite resolve sem extensão, mas escrever completo evita surpresa.)
- O caminho precisa começar com `./` ou `../`. Sem isso, o navegador procura um pacote npm.
- Módulos são `defer` por padrão e executam em **modo estrito**.
- Cada módulo é avaliado **uma única vez**, mesmo que importado em vários lugares.

```html
<script type="module" src="main.js"></script>
```

### 4.1 Importação dinâmica

Carrega o módulo apenas quando necessário, reduzindo o peso inicial:

```javascript
botao.addEventListener('click', async () => {
  const { gerarRelatorio } = await import('./relatorio.js')
  gerarRelatorio()
})
```

O código de `relatorio.js` só é baixado no primeiro clique. Isso é *code splitting*, e o
Vite gera os arquivos separados automaticamente.

---

## 5. Por que um servidor de desenvolvimento

Abrir o arquivo direto (`file://`) impede:

- `import` de módulos ES (bloqueado por CORS)
- `fetch` de arquivos locais
- Service Workers e APIs de contexto seguro
- Recarregamento automático ao salvar

Um servidor de desenvolvimento serve os arquivos por `http://localhost`, o que resolve
todos esses pontos e ainda adiciona o **HMR** (*Hot Module Replacement*): ao salvar, apenas
o módulo alterado é substituído na página, preservando o estado da aplicação. Você não
perde o formulário preenchido a cada `Ctrl+S`.

---

## 6. Vite

O **Vite** é a ferramenta padrão do front-end atual. Ele entrega duas coisas:

- **Em desenvolvimento**: serve os arquivos como módulos ES nativos, sem empacotar. Por
  isso inicia em menos de um segundo mesmo em projeto grande.
- **Em produção**: gera um build otimizado — código minificado, dividido em partes,
  com nomes versionados para cache.

### 6.1 Criando um projeto

```bash
npm create vite@latest meu-projeto
cd meu-projeto
npm install
npm run dev
```

O assistente pergunta o template. Comece por **Vanilla** — o objetivo aqui é entender a
ferramenta, não aprender um framework.

```bash
npm run dev       # servidor em http://localhost:5173
npm run build     # gera a pasta dist/
npm run preview   # serve o dist/ localmente, para conferir antes de publicar
```

Sempre rode `npm run preview` antes de publicar: é a única forma de testar o resultado
real do build. Coisas que funcionam em desenvolvimento podem quebrar em produção — caminho
de imagem incorreto, variável de ambiente ausente, dependência que só existia em dev.

### 6.2 O que o build faz

```text
Desenvolvimento              Produção (dist/)
──────────────────           ──────────────────────────
main.js       12 kB    →     index-a3f9c1.js     4 kB
estilos.css    8 kB    →     index-b7e2d4.css  2,5 kB
utils.js       5 kB    →     (incluído no bundle)
logo.svg              →     logo-c8d1a2.svg
```

- **Minificação** — remove espaços, comentários e encurta nomes internos
- **Tree shaking** — descarta código exportado mas nunca importado
- **Code splitting** — separa o que é carregado sob demanda
- **Hash no nome** — `index-a3f9c1.js` permite cache eterno; mudou o conteúdo, muda o nome

### 6.3 Configuração

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/meu-projeto/',    // necessário ao publicar em subpasta (GitHub Pages)
  server: {
    port: 3000,
    open: true,             // abre o navegador automaticamente
  },
  build: {
    outDir: 'dist',
    sourcemap: true,        // permite depurar o código de produção
  },
})
```

O `base` é a causa mais comum de "funciona local, quebra no GitHub Pages": sem ele, o
build gera caminhos absolutos que não existem na subpasta.

### 6.4 Variáveis de ambiente

```bash
# .env — este arquivo NÃO vai para o Git
VITE_API_URL=https://api.exemplo.br
```

```javascript
const url = import.meta.env.VITE_API_URL
```

Apenas variáveis com o prefixo `VITE_` chegam ao código do navegador. As demais ficam
restritas ao processo de build.

> ⚠️ **Tudo que chega ao navegador é público.** Qualquer pessoa lê o valor no
> arquivo gerado. Nunca coloque senha de banco, chave privada ou segredo de API em uma
> variável `VITE_` — essas informações pertencem ao back-end.

---

## 7. Estrutura de projeto

```text
meu-projeto/
├── public/              arquivos copiados sem processamento (favicon, robots.txt)
├── src/
│   ├── assets/          imagens e fontes processadas pelo build
│   ├── componentes/     pedaços reutilizáveis de interface
│   ├── servicos/        acesso a APIs (o api.js do Módulo 06)
│   ├── estilos/         CSS
│   └── main.js          ponto de entrada
├── index.html           fica na RAIZ, não em src/
├── package.json
├── vite.config.js
└── .gitignore
```

Duas particularidades do Vite:

- O `index.html` fica na **raiz** e é o ponto de entrada do build.
- Arquivos em `public/` são copiados como estão; arquivos em `src/assets/` passam pelo
  build e recebem hash no nome.

```javascript
// src/main.js
import './estilos/global.css'          // CSS importado pelo JS: o Vite cuida do resto
import { api } from './servicos/api.js'

const app = document.querySelector('#app')
const usuarios = await api.listarUsuarios()
```

---

## 8. Publicação

O build gera arquivos estáticos, hospedáveis em qualquer serviço de arquivos estáticos.

```bash
npm run build     # gera dist/
npm run preview   # confira antes de publicar
```

| Serviço | Como funciona |
| --- | --- |
| **GitHub Pages** | Gratuito; publica direto do repositório. Exige o `base` configurado |
| **Netlify** | Conecta ao repositório e publica a cada push |
| **Vercel** | Semelhante ao Netlify |
| **Cloudflare Pages** | Semelhante, com CDN global |

Nos três últimos, a configuração é: comando de build `npm run build`, diretório de saída
`dist`.

---

## 9. Caminho para frameworks

Com o ferramental compreendido, adotar um framework é trocar o template:

```bash
npm create vite@latest meu-app -- --template react
npm create vite@latest meu-app -- --template vue
npm create vite@latest meu-app -- --template svelte
```

O que muda: a forma de descrever a interface. O que **não** muda: `package.json`,
`npm run dev`, módulos ES, build, `fetch`, CSS, semântica e acessibilidade — tudo o que
você aprendeu nos módulos 01 a 07 continua valendo.

| Framework | Característica |
| --- | --- |
| **React** | Maior participação de mercado e de vagas |
| **Vue** | Curva de aprendizado mais suave |
| **Svelte** | Compila para JavaScript puro; menos código em execução |
| **Angular** | Estrutura completa e opinativa; comum em empresas grandes |

Escolha um e aprofunde. Trocar depois é mais fácil do que parece — a base é a mesma.

---

## Erros comuns

| Sintoma | Causa | Correção |
| --- | --- | --- |
| `command not found: node` | Node não instalado ou fora do PATH | Reinstale pelo gerenciador de versões e reabra o terminal |
| `Cannot use import statement outside a module` | Falta `type="module"` ou `"type": "module"` | Adicione um dos dois |
| CORS ao usar `import` | Aberto via `file://` | Use `npm run dev` |
| `Failed to resolve module specifier` | Faltou `./` no caminho | `'./util.js'`, não `'util.js'` |
| `Module not found` após clonar | Faltou instalar | `npm install` |
| Funciona local, quebra no GitHub Pages | `base` não configurado | Defina `base: '/nome-do-repo/'` |
| Repositório gigante e lento | `node_modules` versionado | Adicione ao `.gitignore` e remova do índice |
| Colegas com resultados diferentes | Lockfile não versionado | Versione o `package-lock.json` |
| Variável de ambiente `undefined` | Falta o prefixo `VITE_` | Renomeie a variável |
| `npm audit` acusa vulnerabilidades | Dependências desatualizadas | `npm audit fix`; avalie antes de usar `--force` |
| Erro de engine ao instalar | Node abaixo do exigido | Atualize para a LTS atual |

---

## Checklist de autoavaliação

- [ ] Instalar e alternar versões do Node com um gerenciador
- [ ] Explicar a diferença entre `dependencies` e `devDependencies`
- [ ] Ler `^7.2.14` e dizer quais atualizações são aceitas
- [ ] Explicar para que serve o lockfile e por que versioná-lo
- [ ] Explicar por que `node_modules` não vai para o Git
- [ ] Criar e executar um script npm
- [ ] Exportar e importar módulos ES, nomeados e padrão
- [ ] Usar importação dinâmica e explicar o ganho
- [ ] Justificar a necessidade de um servidor de desenvolvimento
- [ ] Criar um projeto Vite, rodar dev, build e preview
- [ ] Explicar o que a etapa de build faz com o código
- [ ] Configurar `base` para publicação em subpasta
- [ ] Explicar por que segredo não pode ir em variável `VITE_`

---

## Práticas

| # | Arquivo | Foco | Objetivos trabalhados |
| --- | --- | --- | --- |
| 01 | [Guia de instalação](praticas/01-guia-instalacao.md) | Node, npm e primeiro projeto | 1 |
| 02 | [Módulos ES](praticas/02-modulos-es.html) | `import` / `export` | 3 |

Em seguida, faça a
[Prática Integrada do Módulo 08](../../pratica_ecossistema_frontend/README.md), que compara
lado a lado um projeto sem ferramental e um projeto com Vite.

---

## Exercícios

### Nível 1 — Fixação

1. Instale o Node LTS por um gerenciador de versões. Registre a saída de `node --version`,
   `npm --version` e explique por que a versão LTS é a recomendada.
2. Crie um projeto do zero com `npm init -y`, adicione o script `"ola": "echo Olá, ADS!"` e
   execute-o. Depois adicione `"type": "module"` e explique o efeito.
3. Interprete: `"vite": "^7.2.0"`, `"eslint": "~9.1.3"`, `"react": "18.3.1"`. Quais
   atualizações cada uma aceita?

### Nível 2 — Aplicação

4. Divida um projeto de arquivo único em módulos: `formatadores.js`, `validadores.js`,
   `api.js` e `main.js`. Cada módulo exporta apenas o necessário. Rode com `npm run dev` e
   confirme no painel Network que o navegador carrega cada arquivo separadamente.
5. Crie um projeto Vite com template Vanilla e reconstrua uma página feita no Módulo 05,
   agora com estrutura em `src/`. Rode `npm run build` e compare o tamanho dos arquivos em
   `dist/` com os originais. Registre os números.
6. Publique o projeto do exercício 5 no GitHub Pages. Documente o que precisou ser
   configurado e o que quebrou na primeira tentativa.

### Nível 3 — Desafio

7. **Carregamento sob demanda.** Construa uma aplicação com três telas, em que o módulo de
   cada tela só é baixado quando o usuário a acessa, por importação dinâmica. Comprove no
   painel Network que os arquivos chegam separadamente. Compare, com números, o peso
   inicial contra a versão que importa tudo de uma vez.
8. **Comparação fundamentada.** Pegue um projeto seu de módulo anterior e mantenha duas
   versões: uma sem ferramental, aberta por `file://`, e outra com Vite. Compare com dados:
   peso total transferido, número de requisições, tempo até o LCP (com throttling Slow 4G),
   e o que cada versão permite ou impede em termos de organização de código. Escreva uma
   conclusão de uma página respondendo: em que ponto o ferramental deixa de ser exagero e
   passa a ser necessário?

---

## Referências

- [Node.js — documentação](https://nodejs.org/pt/docs)
- [Cronograma de versões do Node](https://github.com/nodejs/release#release-schedule)
- [npm — documentação](https://docs.npmjs.com/)
- [Versionamento semântico](https://semver.org/lang/pt-BR/)
- [Vite — documentação](https://vite.dev/)
- [Módulos JavaScript — MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules)
- [nvm](https://github.com/nvm-sh/nvm) · [nvm-windows](https://github.com/coreybutler/nvm-windows)

---

**Navegação:** [◀ Módulo 07](../07-devtools/README.md) · [Índice](../../README.md) · **Fim da trilha de módulos** — siga para as [práticas integradas](../../README.md#práticas-integradas)
