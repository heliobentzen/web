---
marp: true
theme: default
size: 16:9
paginate: true
footer: 'Desenvolvimento Web · ADS · IFPE'
style: |
  section {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: #ffffff;
    color: #1f2937;
    font-size: 28px;
    line-height: 1.35;
    padding: 56px 64px;
  }
  footer {
    color: #666;
    font-size: 0.52em;
    border-top: 2px solid #0f7a3f;
    padding-top: 4px;
  }
  h1 {
    color: #0b5f31;
    font-size: 1.7em;
    border-bottom: 3px solid #df2b2f;
    padding-bottom: 6px;
    margin-bottom: 0.4em;
  }
  h2 { color: #0b5f31; font-size: 1.2em; margin-bottom: 0.3em; }
  h3 { font-size: 1em; margin-bottom: 0.2em; }
  ul, ol { margin-top: 0.3em; }
  li { margin: 0.22em 0; }
  strong { color: #df2b2f; }
  em { color: #0f7a3f; font-style: normal; }
  table { font-size: 0.72em; border-collapse: collapse; width: 100%; }
  th { background: #0f7a3f; color: #fff; padding: 6px 8px; }
  td { border: 1px solid #ddd; padding: 5px 8px; background: #fafafa; }
  code { background: #f0f0f0; color: #b91c1c; padding: 1px 5px; border-radius: 4px; font-size: 0.9em; }
  pre { background: #f7f7f7 !important; border-radius: 8px; border: 1px solid #ddd; padding: 12px; margin: 0.4em 0; }
  pre code { color: #333; background: none; font-size: 0.8em; line-height: 1.25; }
  blockquote { border-left: 4px solid #0f7a3f; background: #f0faf0; padding: 8px 14px; border-radius: 0 8px 8px 0; color: #333; }
  a { color: #0f7a3f; }
  section::after { color: #999; font-size: 0.65em; }
  .card { background: #fff; border: 2px solid #b7e4c7; border-radius: 14px; padding: 14px 18px; margin: 8px 0; }
  .ok { color: #0f766e; font-weight: 700; }
  .bad { color: #b91c1c; font-weight: 700; }
  section.capa { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
  section.capa h1 { border: none; font-size: 1.55em; margin-bottom: 0.15em; }
  section.capa h2 { margin-top: 0; }
---

<!-- _class: capa -->
<!-- _paginate: false -->
<!-- _footer: '' -->

![w:220](../../assets/ifpe-logo.svg)

# Desenvolvimento Web

## Módulo 03 · CSS Moderno

**Prof. Hélio Bentzen**
IFPE · Análise e Desenvolvimento de Sistemas

---

# Roteiro da Aula

1. Seletores e especificidade
2. Box model
3. Unidades e variáveis
4. Flexbox
5. CSS Grid
6. Responsividade (Mobile First)
7. Container queries
8. Estados, transições e animações

---

# Seletores Básicos

```css
* { box-sizing: border-box; }          /* universal */
p { line-height: 1.6; }                /* tipo */
.card { background: white; }           /* classe */
#header { position: sticky; }          /* id */
input[type="email"] { border: 1px solid; }
.nav a { color: white; }               /* descendente */
.nav > a { font-weight: 600; }         /* filho direto */
```

```css
.card.destaque { border: 2px solid gold; } /* combinação */
```

---

# Especificidade (quem vence)

| Seletor | Peso |
|---|---|
| `*` | 0,0,0 |
| `p` / `div` / `::before` | 0,0,1 |
| `.classe` / `[attr]` / `:hover` | 0,1,0 |
| `#id` | 1,0,0 |
| `style=""` | vence tudo, exceto `!important` |

```css
.card p { color: blue; }       /* 0,1,1 */
#titulo { color: red; }        /* 1,0,0 → vence */
```

<div class="card">
Empatou? Vence a regra que aparece por último.
</div>

---

# `:is()`, `:where()` e `:has()`

```css
/* :is() agrupa e assume a maior especificidade do grupo */
:is(h1, h2, h3) { margin-block: 0.5em; }

/* :where() agrupa com especificidade ZERO — ótimo para resets */
:where(ul, ol) { padding-inline-start: 1.5rem; }

/* :has() — o "seletor pai" */
.card:has(img) { padding-top: 0; }
label:has(input:checked) { font-weight: 700; }
form:has(:invalid) button { opacity: 0.5; }
```

<div class="card">
`:has()` é Baseline desde 2023: pode usar.
</div>

---

# Box Model

Todo elemento é uma caixa: **content → padding → border → margin**

```css
/* sem border-box: largura final = 200 + 40 + 4 = 244px */
.elemento { width: 200px; padding: 20px; border: 2px solid; }
```

```css
/* com border-box: largura final = 200px. Sempre use. */
*, *::before, *::after { box-sizing: border-box; }
```

---

# Unidades: quando usar cada uma

| Unidade | Use para |
|---|---|
| `rem` | Fontes e espaçamentos — respeita o zoom do usuário |
| `em` | Espaçamento relativo ao próprio texto do componente |
| `%` | Largura dentro do container |
| `fr` | Divisão de espaço no Grid |
| `ch` | Largura de coluna de texto (~60ch é confortável) |
| `dvh` | Altura da viewport **sem** o pulo da barra do navegador móvel |

<div class="card">
Evite `px` em fontes: quebra o zoom de quem precisa de texto maior.
</div>

---

# `clamp()`: tipografia fluida

```css
h1 {
  /* mínimo | ideal (escala com a tela) | máximo */
  font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
}

.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}
```

Um valor que se adapta sem precisar de `@media`.

---

# Variáveis CSS

```css
:root {
  --cor-primaria: #0b5f31;
  --cor-texto: #1f2937;
  --espaco-md: 1rem;
  --raio: 8px;
}

.botao {
  background: var(--cor-primaria);
  color: white;
  padding: var(--espaco-md);
  border-radius: var(--raio);
}
```

```css
/* fallback encadeado */
.card { color: var(--cor-custom, var(--cor-texto)); }
```

---

# Tema claro/escuro com variáveis

```css
:root {
  --fundo: #ffffff;
  --texto: #1f2937;
}

@media (prefers-color-scheme: dark) {
  :root {
    --fundo: #111827;
    --texto: #f3f4f6;
  }
}

body { background: var(--fundo); color: var(--texto); }
```

Uma troca de valores muda o tema inteiro.

---

# Flexbox (1 dimensão)

```css
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.item { flex: 1 1 240px; }
```

Use quando o layout é **uma linha** ou **uma coluna**.

---

# Padrões Úteis com Flex

```css
/* centralização perfeita */
.centralizado {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* rodapé sempre no fim da página */
.pagina {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
.conteudo { flex: 1; }
```

---

# CSS Grid (2 dimensões)

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  gap: 1rem;
  min-height: 100dvh;
}

.cabecalho { grid-area: header; }
.barra     { grid-area: sidebar; }
```

---

# Grid Responsivo sem Media Query

```css
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

- `auto-fit`: ajusta o número de colunas ao espaço
- `minmax(280px, 1fr)`: mínimo legível, crescimento fluido

<div class="card">
Três linhas que substituem três media queries.
</div>

---

# Flexbox ou Grid?

| Situação | Escolha |
|---|---|
| Barra de navegação | Flex |
| Alinhar itens numa linha | Flex |
| Layout da página inteira | Grid |
| Galeria de cards | Grid |
| Conteúdo dita o tamanho | Flex |
| Layout dita o tamanho | Grid |

<div class="card">
Eles se combinam: Grid para a página, Flex dentro de cada card.
</div>

---

# Mobile First

```css
/* base: mobile, sem media query */
.container { width: 100%; padding: 1rem; }
.grid-cards { display: grid; grid-template-columns: 1fr; }

/* tablet */
@media (min-width: 48rem) {
  .grid-cards { grid-template-columns: repeat(2, 1fr); }
}

/* desktop */
@media (min-width: 64rem) {
  .grid-cards { grid-template-columns: repeat(3, 1fr); }
}
```

Escreva o simples primeiro, adicione complexidade conforme sobra espaço.

---

# Container Queries

Media query pergunta o tamanho da **tela**. Container query pergunta o tamanho do **espaço disponível**.

```css
.area-cards { container-type: inline-size; }

.card { display: grid; gap: 0.5rem; }

@container (min-width: 30rem) {
  .card { grid-template-columns: 120px 1fr; }
}
```

<div class="card">
O mesmo card se adapta na sidebar e no conteúdo principal — sem saber onde está.
</div>

---

# Aninhamento Nativo e `@layer`

```css
/* aninhamento: sem pré-processador */
.card {
  padding: 1rem;

  & h3 { margin: 0; }
  &:hover { box-shadow: 0 4px 12px rgb(0 0 0 / 0.15); }
}
```

```css
/* camadas: controlam a cascata sem !important */
@layer reset, base, componentes, utilitarios;

@layer componentes { .botao { background: var(--cor-primaria); } }
```

Regra em camada posterior vence, **mesmo com especificidade menor**.

---

# Pseudo-classes e Pseudo-elementos

```css
a:hover { color: #0b5f31; }
a:focus-visible { outline: 3px solid #0f7a3f; outline-offset: 2px; }
input:invalid:not(:placeholder-shown) { border-color: #b91c1c; }
li:nth-child(odd) { background: #f8f9fa; }

.botao::before { content: "→ "; }
::selection { background: #0f7a3f; color: white; }
```

<div class="card">
Use <code>:focus-visible</code>, não <code>:focus</code>: o anel só aparece para quem navega por teclado.
</div>

---

# Transições e Animações

```css
.card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.card:hover {
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.2);
  transform: translateY(-3px);
}

@keyframes surgir {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Anime `transform` e `opacity`: são as únicas propriedades baratas.

---

# Respeite quem prefere menos movimento

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

<div class="card">
Movimento excessivo causa enjoo e crise vestibular em parte dos usuários. Isto não é opcional.
</div>

---

# Erros que Custam Caro

| <span class="bad">Evite</span> | <span class="ok">Prefira</span> |
|---|---|
| `outline: none` | `:focus-visible` com estilo próprio |
| `!important` para resolver conflito | `@layer` ou revisar especificidade |
| `100vh` em mobile | `100dvh` |
| `font-size` em `px` | `rem` |
| Animar `left` / `width` | Animar `transform` |
| Media query para tudo | `auto-fit` + `clamp()` |

---

# Práticas do Módulo

| # | Arquivo | Foco |
|---|---|---|
| 00 | `praticas/00-primeiros-passos-css.html` | Seletores e box model |
| 01 | `praticas/01-flexbox.html` | Flexbox |
| 02 | `praticas/02-grid.html` | Grid |
| 03 | `praticas/03-responsivo-mobile-first.html` | Responsividade |
| 04 | `praticas/04-variaveis-css.html` | Variáveis e temas |
| 05 | `praticas/05-layout-intermediario.html` | Layout completo |

---

# Referências

- [MDN — Flexbox](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_flexible_box_layout)
- [MDN — CSS Grid](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout)
- [MDN — Container Queries](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_containment/Container_queries)
- [web.dev — Learn CSS](https://web.dev/learn/css/)
- [Flexbox Froggy](https://flexboxfroggy.com/#pt-br) · [Grid Garden](https://cssgridgarden.com/#pt-br)

---

# Encerramento

**Objetivo da semana:**

- Saber quando usar Flexbox e quando usar Grid
- Construir um layout responsivo com Mobile First
- Montar um mini design system com variáveis CSS

### Próxima aula

Acessibilidade Web: WCAG 2.2, ARIA e navegação por teclado.
