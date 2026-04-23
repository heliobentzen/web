# Módulo 01 – Como a Web Funciona

## O que você vai aprender

- URL → navegador → servidor → resposta (ciclo básico)
- O que é DOM e como o navegador renderiza HTML
- Inspecionar páginas com DevTools

---

## 1. O Ciclo de Requisição

Resumido:
```
URL → DNS (descobre IP) → HTTP Request → Servidor responde → Navegador renderiza
```

**Tudo que você precisa saber:**
- **URL**: endereço da página (ex: `https://exemplo.com/pagina`)
- **DNS**: traduz `exemplo.com` → IP do servidor
- **HTTP/HTTPS**: protocolo para comunicação (HTTPS é seguro)
- **Renderização**: navegador transforma HTML em página visual

---

## 2. DOM – Document Object Model
- **Integridade** – dados não foram alterados em trânsito
- **Autenticidade** – certificado válido emitido para o domínio correto

> 💡 Desde 2018, o Google Chrome marca sites HTTP como "Não Seguro". HTTPS é obrigatório em produção.

### 1.4 HTTP/2 e HTTP/3

| Versão | Característica principal |
|--------|--------------------------|
| HTTP/1.1 | Uma requisição por conexão TCP (com keep-alive) |
| HTTP/2 | Multiplexação: múltiplas requisições numa conexão |
| HTTP/3 | Baseado em QUIC (UDP), latência ainda menor |

**Verbos HTTP mais usados:**

| Verbo | Uso |
|-------|-----|
| `GET` | Buscar recursos |
| `POST` | Criar/enviar dados |
| `PUT` | Substituir recurso |
| `PATCH` | Atualizar parcialmente |
| `DELETE` | Remover recurso |

**Códigos de status importantes:**

| Código | Significado |
|--------|-------------|
| `200 OK` | Sucesso |
| `201 Created` | Recurso criado |
| `301 Moved Permanently` | Redirecionamento permanente |
| `400 Bad Request` | Erro do cliente |
| `401 Unauthorized` | Não autenticado |
| `403 Forbidden` | Sem permissão |
| `404 Not Found` | Recurso não encontrado |
| `500 Internal Server Error` | Erro no servidor |

---

## 2. Como os Navegadores Funcionam

O navegador é um software complexo que executa várias etapas para transformar HTML, CSS e JavaScript em uma página visível:

### 2.1 Pipeline de Renderização (Critical Rendering Path)

```
HTML bytes → Tokens → DOM
CSS bytes  → Tokens → CSSOM
                        ↓
                   Render Tree
                        ↓
                     Layout
                        ↓
                      Paint
                        ↓
                   Composite
```

**Detalhamento:**

1. **Parsing HTML → DOM**: O navegador lê os bytes HTML e constrói o *Document Object Model* (árvore de nós).
2. **Parsing CSS → CSSOM**: Simultaneamente, o CSS é parseado em um *CSS Object Model*.
3. **Render Tree**: DOM + CSSOM são combinados. Apenas elementos visíveis entram na render tree (`display: none` é excluído).
4. **Layout (Reflow)**: O navegador calcula posição e tamanho de cada elemento.
5. **Paint**: Pixels são desenhados em camadas.
6. **Composite**: Camadas são compostas e exibidas na tela.

> ⚡ **Performance**: JavaScript bloqueia o parsing do DOM (é *render-blocking*). Use `defer` ou `async` em scripts externos, ou posicione `<script>` antes do `</body>`.

### 2.2 Processos do Navegador (Arquitetura Moderna)

Navegadores modernos (Chrome, Edge) usam múltiplos processos isolados:

- **Browser Process** – interface da janela, abas, permissões
- **Renderer Process** – um por aba, executa HTML/CSS/JS (sandbox)
- **GPU Process** – composição de camadas
- **Network Process** – requisições de rede
- **Plugin/Extension Processes** – isolados por segurança

---

## 3. DOM – Document Object Model

O DOM é uma **representação em árvore do documento HTML na memória**. É uma API padronizada pelo W3C/WHATWG que permite que JavaScript leia e modifique o conteúdo, estrutura e estilo da página.

### 3.1 Estrutura em Árvore

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Exemplo</title>
  </head>
  <body>
    <h1 id="titulo">Olá, Web!</h1>
    <p class="intro">Parágrafo de exemplo.</p>
  </body>
</html>
```

Árvore DOM correspondente:

```
Document
└── html (Element)
    ├── head (Element)
    │   └── title (Element)
    │       └── "Exemplo" (Text)
    └── body (Element)
        ├── h1#titulo (Element)
        │   └── "Olá, Web!" (Text)
        └── p.intro (Element)
            └── "Parágrafo de exemplo." (Text)
```

### 3.2 Tipos de Nós

| Tipo | Constante | Exemplo |
|------|-----------|---------|
| Element | `Node.ELEMENT_NODE` (1) | `<div>`, `<p>` |
| Text | `Node.TEXT_NODE` (3) | conteúdo textual |
| Comment | `Node.COMMENT_NODE` (8) | `<!-- comentário -->` |
| Document | `Node.DOCUMENT_NODE` (9) | `document` |
| DocumentType | `Node.DOCUMENT_TYPE_NODE` (10) | `<!DOCTYPE html>` |

### 3.3 CSSOM e Render Tree

Paralelo ao DOM existe o **CSSOM** (CSS Object Model). Juntos formam a *Render Tree*, que é o que de fato aparece na tela.

---

## 4. Web Standards

Web Standards são especificações abertas que garantem que a web funcione de forma consistente em todos os navegadores.

### 4.1 Organizações

| Organização | Papel |
|-------------|-------|
| **W3C** (World Wide Web Consortium) | HTML, CSS, WAI-ARIA, SVG, WebVTT |
| **WHATWG** | HTML Living Standard, DOM, Fetch, Streams |
| **ECMA International** | ECMAScript (JavaScript) |
| **IETF** | HTTP, TLS, WebSockets (protocolos de rede) |
| **Khronos Group** | WebGL, WebGPU |

### 4.2 Principais Especificações

- **HTML Living Standard** – https://html.spec.whatwg.org/
- **CSS Specifications** – https://www.w3.org/Style/CSS/
- **ECMAScript** – https://tc39.es/ecma262/
- **Fetch Standard** – https://fetch.spec.whatwg.org/
- **WCAG 2.2** – https://www.w3.org/TR/WCAG22/

### 4.3 Can I Use

Antes de usar uma API moderna, verifique o suporte nos navegadores em [caniuse.com](https://caniuse.com/).

---

## 5. Browser APIs Essenciais

O navegador expõe diversas APIs nativas para JavaScript:

| API | Função |
|-----|--------|
| `document` | Acesso ao DOM |
| `window` | Objeto global, dimensões, navegação |
| `navigator` | Informações do navegador/dispositivo |
| `location` | URL atual, redirecionamento |
| `history` | Navegação no histórico (pushState) |
| `localStorage` / `sessionStorage` | Armazenamento local |
| `fetch()` | Requisições HTTP |
| `setTimeout` / `setInterval` | Temporizadores |
| `requestAnimationFrame` | Animações otimizadas |
| `IntersectionObserver` | Detecção de visibilidade de elementos |
| `MutationObserver` | Observação de mudanças no DOM |
| `ResizeObserver` | Observação de mudanças de tamanho |
| `ServiceWorker` | Cache offline e PWA |

---

## Práticas

| # | Arquivo | Descrição |
|---|---------|-----------|
| 01 | [Inspecionando o Navegador](praticas/01-inspecionando-navegador.md) | Explorar o processo de carregamento de uma página com DevTools |
| 02 | [Explorando o DOM](praticas/02-explorando-dom.html) | Manipular o DOM via console do navegador |

---

## Próximas Etapas

Faça as práticas!
