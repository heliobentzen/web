# Módulo 08 – Ecossistema Front-End

## Prática Integrada Relacionada

- [Prática Integrada - Módulo 08](../../pratica_ecossistema_frontend/README.md)

## Objetivo do Módulo

Entender como organizar e executar projetos front-end modernos com Node.js, npm, `package.json`, módulos ES e Vite. A ideia é sair do arquivo HTML isolado e avançar para uma base com scripts, dependências e estrutura preparada para crescer.

## Como Praticar

1. Execute cada comando sugerido no terminal.
2. Abra os exemplos de módulo ES no navegador quando o trecho for puro JavaScript.
3. Observe a diferença entre rodar um arquivo diretamente e rodar um projeto preparado com Vite.

---

## 1. Node.js e npm

Node.js permite executar JavaScript fora do navegador. O npm gerencia pacotes, scripts e dependências do projeto.

```bash
node --version
npm --version
```

Rode este trecho no seu ambiente antes de avançar.

- Confirme se o Node está instalado.
- Compare a versão local com a versão recomendada pelo projeto.

---

## 2. Estrutura Básica de Projeto

Antes de usar ferramentas mais avançadas, é importante entender a estrutura mínima de um projeto front-end.

```text
meu-projeto/
├── index.html
├── styles.css
└── main.js
```

### Exemplo Executável

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Projeto Simples</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1 id="titulo">Projeto simples</h1>
    <script type="module" src="main.js"></script>
  </body>
</html>
```

```javascript
const titulo = document.querySelector('#titulo')
titulo.textContent = 'JavaScript rodando no navegador'
```

Rode este trecho no seu ambiente antes de avançar.

- Crie os três arquivos acima e abra o HTML no navegador.
- Altere o texto no JS e recarregue a página.

---

## 3. `package.json`

O `package.json` descreve o projeto, as dependências e os scripts que podem ser executados com `npm run`.

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### Campos Importantes

- `name` identifica o projeto.
- `type: module` ativa ES Modules no Node e no front-end.
- `scripts` cria atalhos para comandos frequentes.
- `devDependencies` guarda pacotes usados apenas no desenvolvimento.

Rode este trecho no seu ambiente antes de avançar.

- Crie um `package.json` mínimo com `npm init -y`.
- Adicione um script e rode `npm run` para testá-lo.

---

## 4. Scripts com npm

Scripts padronizam tarefas do projeto e evitam comandos longos repetidos.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint src"
  }
}
```

Rode este trecho no seu ambiente antes de avançar.

- Adicione um script de teste ou formatação.
- Rode `npm run dev` e depois `npm run build`.

---

## 5. Módulos ES

Módulos permitem separar código em arquivos menores, com importações e exportações explícitas.

```javascript
// matematica.js
export function somar(a, b) {
  return a + b
}

export const PI = 3.14159

// app.js
import { somar, PI } from './matematica.js'

console.log(somar(2, 3))
console.log(PI)
```

Rode este trecho no seu ambiente antes de avançar.

- Crie os dois arquivos em uma pasta e abra com um HTML usando `type="module"`.
- Altere o nome de uma exportação e veja o erro apontar o arquivo correto.

---

## 6. Importação Dinâmica

Importação dinâmica carrega módulos sob demanda, o que ajuda a dividir o código em partes menores.

```javascript
async function carregarModulo() {
  const modulo = await import('./utilitarios.js')
  console.log(modulo)
}

carregarModulo()
```

Rode este trecho no seu ambiente antes de avançar.

- Crie `utilitarios.js` com uma exportação simples.
- Veja quando o módulo só é carregado após a chamada da função.

---

## 7. Vite

Vite fornece servidor de desenvolvimento, build otimizado e carregamento rápido para projetos modernos.

```bash
npm create vite@latest meu-projeto
cd meu-projeto
npm install
npm run dev
npm run build
```

### Por que Vite ajuda?

- Inicia rápido em projetos pequenos e grandes.
- Usa ES Modules durante o desenvolvimento.
- Gera build otimizado para produção.
- Facilita a transição para frameworks como React, Vue e Svelte.

Rode este trecho no seu ambiente antes de avançar.

- Crie um projeto novo com o template `vanilla`.
- Compare o que muda entre abrir um HTML direto e rodar `npm run dev`.

---

## 8. Estrutura de Projeto com Vite

Uma base com Vite costuma separar ponto de entrada, código fonte e arquivos estáticos.

```text
meu-projeto/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── main.js
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

Rode este trecho no seu ambiente antes de avançar.

- Coloque uma imagem em `public/` e carregue-a no HTML.
- Mova o CSS para `src/styles.css` e importe no arquivo principal.

---

## 9. Mini Exemplo com Vite

Este fluxo mostra o ciclo básico de desenvolvimento moderno.

```javascript
// src/main.js
import './styles.css'

const app = document.querySelector('#app')
app.innerHTML = `
  <section>
    <h1>Olá, Vite</h1>
    <p>Este conteúdo foi carregado por um módulo ES.</p>
  </section>
`
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
  </html>
```

Rode este trecho no seu ambiente antes de avançar.

- Inicie o projeto com Vite e edite `src/main.js`.
- Observe o recarregamento automático no navegador.

---

## 10. Versão com React ou Outro Framework

Depois que a estrutura com Vite estiver clara, é possível trocar o template para React, Vue ou outro framework sem mudar a lógica básica de desenvolvimento.

Rode este trecho no seu ambiente antes de avançar.

- Crie um projeto React com `npm create vite@latest meu-app -- --template react`.
- Compare a diferença entre `main.js` e `main.jsx`.

---

## 11. Mini Checklist de Aprendizado

Antes de avançar, confirme se você consegue:

- explicar o que é Node.js
- explicar para que serve o `package.json`
- escrever e executar um script com npm
- importar e exportar módulos ES
- iniciar um projeto com Vite
- identificar quando um projeto simples precisa evoluir para uma estrutura com tooling

---

## Próximo Passo

Depois de dominar estes tópicos, siga para a [Prática Integrada - Módulo 08](../../pratica_ecossistema_frontend/README.md) para aplicar o conteúdo em uma comparação guiada entre uma base simples e uma base com Vite.
