# Módulo 03 – CSS Moderno: Flexbox, Grid, Variáveis e Design Responsivo

## Objetivos

Ao final deste módulo você será capaz de:

- Dominar o modelo de caixa (Box Model) do CSS
- Criar layouts flexíveis com Flexbox
- Criar layouts bidimensionais com CSS Grid
- Usar variáveis CSS (Custom Properties) para temas consistentes
- Aplicar Design Responsivo com a abordagem Mobile First
- Usar pseudo-classes, pseudo-elementos e animações

---

## 1. Seletores e Especificidade

### 1.1 Tipos de Seletores

```css
/* Universal */
* { box-sizing: border-box; }

/* Tipo (tag) */
p { line-height: 1.6; }

/* Classe */
.card { background: white; }

/* ID */
#header { position: sticky; top: 0; }

/* Atributo */
input[type="email"] { border-color: blue; }
a[href^="https"] { color: green; }   /* href começa com "https" */
a[href$=".pdf"] { color: red; }      /* href termina com ".pdf" */
a[href*="example"] { color: orange; } /* href contém "example" */

/* Descendente */
.nav a { color: white; }

/* Filho direto */
.nav > li { display: inline-block; }

/* Irmão adjacente */
h2 + p { font-size: 1.1em; }

/* Irmãos gerais */
h2 ~ p { color: gray; }

/* Combinação */
.card.destaque { border: 2px solid gold; }
```

### 1.2 Especificidade

A especificidade determina qual regra CSS "vence" quando há conflito:

| Seletor | Especificidade |
|---------|---------------|
| `*` | 0,0,0,0 |
| `p`, `div`, `section` | 0,0,0,1 |
| `.classe`, `[attr]`, `:hover` | 0,0,1,0 |
| `#id` | 0,1,0,0 |
| `style=""` (inline) | 1,0,0,0 |
| `!important` | Sobrescreve tudo (evite!) |

**Calculando especificidade:**
```css
/* 0,0,1,1 – classe + tag */
.card p { color: blue; }

/* 0,1,0,0 – ID */
#titulo { color: red; }  /* vence */

/* 0,0,2,1 – duas classes + tag */
.card.destaque p { color: green; }
```

---

## 2. Box Model

Todo elemento HTML é uma caixa com quatro áreas:

```
┌─────────────────────────────────┐
│            MARGIN               │
│  ┌───────────────────────────┐  │
│  │         BORDER            │  │
│  │  ┌─────────────────────┐  │  │
│  │  │       PADDING       │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │    CONTENT    │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

```css
/* box-sizing padrão (content-box): width/height = apenas o conteúdo */
.elemento {
  width: 200px;
  padding: 20px;
  border: 2px solid;
  /* largura total = 200 + 20*2 + 2*2 = 244px */
}

/* box-sizing: border-box (recomendado): width/height inclui padding e border */
*, *::before, *::after {
  box-sizing: border-box;
}
.elemento {
  width: 200px;
  padding: 20px;
  border: 2px solid;
  /* largura total = 200px (sempre!) */
}
```

---

## 3. Variáveis CSS (Custom Properties)

```css
/* Definição: escopo global no :root */
:root {
  /* Cores */
  --cor-primaria: #0d6efd;
  --cor-secundaria: #6c757d;
  --cor-sucesso: #198754;
  --cor-perigo: #dc3545;
  --cor-fundo: #f8f9fa;
  --cor-texto: #212529;

  /* Tipografia */
  --fonte-base: system-ui, -apple-system, sans-serif;
  --tamanho-base: 1rem;
  --linha-base: 1.6;

  /* Espaçamento */
  --espaco-xs: 0.25rem;
  --espaco-sm: 0.5rem;
  --espaco-md: 1rem;
  --espaco-lg: 1.5rem;
  --espaco-xl: 3rem;

  /* Bordas */
  --borda-radius: 8px;
  --borda-radius-pill: 999px;

  /* Sombras */
  --sombra-sm: 0 1px 3px rgba(0,0,0,0.12);
  --sombra-md: 0 4px 12px rgba(0,0,0,0.15);
  --sombra-lg: 0 8px 32px rgba(0,0,0,0.18);

  /* Transições */
  --transicao: 0.2s ease;

  /* Z-index camadas */
  --z-base: 1;
  --z-dropdown: 100;
  --z-modal: 1000;
  --z-toast: 9999;
}

/* Uso */
.botao {
  background: var(--cor-primaria);
  color: white;
  padding: var(--espaco-sm) var(--espaco-md);
  border-radius: var(--borda-radius);
  transition: background var(--transicao);
}

/* Fallback (valor padrão caso a variável não exista) */
.elemento {
  color: var(--cor-custom, var(--cor-texto));
}

/* Tema escuro com variáveis */
@media (prefers-color-scheme: dark) {
  :root {
    --cor-fundo: #1a1a2e;
    --cor-texto: #e9ecef;
  }
}

/* Tema escuro por classe (toggle com JS) */
[data-tema="escuro"] {
  --cor-fundo: #1a1a2e;
  --cor-texto: #e9ecef;
}
```

---

## 4. Flexbox

Flexbox é ideal para layouts **unidimensionais** (linha ou coluna).

```css
/* Container flex */
.container {
  display: flex;

  /* Direção */
  flex-direction: row;            /* row | row-reverse | column | column-reverse */

  /* Quebra de linha */
  flex-wrap: wrap;                /* nowrap | wrap | wrap-reverse */

  /* Alinhamento no eixo principal (horizontal em row) */
  justify-content: flex-start;   /* flex-start | flex-end | center | space-between | space-around | space-evenly */

  /* Alinhamento no eixo cruzado (vertical em row) */
  align-items: stretch;          /* stretch | flex-start | flex-end | center | baseline */

  /* Alinhamento de múltiplas linhas (com wrap) */
  align-content: flex-start;     /* flex-start | flex-end | center | space-between | space-around | stretch */

  /* Atalho: flex-direction + flex-wrap */
  flex-flow: row wrap;

  gap: 1rem;                     /* espaço entre itens */
}

/* Itens flex */
.item {
  /* Crescimento proporcional (padrão: 0) */
  flex-grow: 1;

  /* Encolhimento proporcional (padrão: 1) */
  flex-shrink: 0;

  /* Tamanho base */
  flex-basis: 200px;

  /* Atalho: grow shrink basis */
  flex: 1 0 200px;

  /* Alinhamento individual (sobrescreve align-items) */
  align-self: center;

  /* Ordem de exibição */
  order: 2;
}

/* Padrões comuns */

/* Centralizar perfeitamente */
.centralizado {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Itens igualmente distribuídos */
.distribuido {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Coluna com footer fixo no rodapé */
.pagina {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.conteudo { flex: 1; }

/* Cards com largura mínima e crescimento proporcional */
.grid-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.grid-cards .card {
  flex: 1 1 280px; /* cresce, encolhe, base 280px */
  max-width: 100%;
}
```

### Eixos do Flexbox

```
flex-direction: row (padrão)
────────────────────────────────── →  eixo principal
│ [item1] [item2] [item3]        │
│                                │
↓ eixo cruzado

flex-direction: column
────────────────────────────────── ↓  eixo principal
│ [item1]                        │
│ [item2]                        →  eixo cruzado
│ [item3]                        │
```

---

## 5. CSS Grid

CSS Grid é ideal para layouts **bidimensionais** (linhas E colunas).

```css
/* Container grid */
.container {
  display: grid;

  /* Definir colunas */
  grid-template-columns: 200px 1fr 1fr;     /* px, fr, %, auto */
  grid-template-columns: repeat(3, 1fr);    /* 3 colunas iguais */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* responsivo */
  grid-template-columns: [sidebar-start] 250px [sidebar-end main-start] 1fr [main-end];

  /* Definir linhas */
  grid-template-rows: auto 1fr auto;        /* header, main, footer */

  /* Áreas nomeadas */
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";

  /* Espaços */
  gap: 1.5rem;                              /* row-gap + column-gap */
  row-gap: 1rem;
  column-gap: 2rem;

  /* Alinhamento de todos os itens */
  justify-items: stretch;                   /* stretch | start | end | center */
  align-items: stretch;                     /* stretch | start | end | center */

  /* Alinhamento do grid no container */
  justify-content: start;                   /* quando grid < container */
  align-content: start;
}

/* Posicionamento de itens */
.item {
  /* Por linhas de grade (numeradas a partir de 1) */
  grid-column: 1 / 3;       /* da linha 1 até a linha 3 */
  grid-column: 1 / -1;      /* da primeira até a última linha */
  grid-column: span 2;      /* ocupa 2 colunas */

  grid-row: 2 / 4;
  grid-row: span 2;

  /* Por área nomeada */
  grid-area: sidebar;

  /* Alinhamento individual */
  justify-self: center;
  align-self: start;
}

/* Layouts prontos */

/* Layout clássico com áreas nomeadas */
.layout-pagina {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}
.site-header { grid-area: header; }
.site-sidebar { grid-area: sidebar; }
.site-main { grid-area: main; }
.site-footer { grid-area: footer; }

/* Grid de cards responsivo */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Grid masonry (experimental em alguns navegadores) */
.masonry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 10px;
}
```

### auto-fill vs auto-fit

```css
/* auto-fill: cria colunas vazias para preencher o espaço */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* auto-fit: colapsa colunas vazias e itens existentes crescem */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

---

## 6. Design Responsivo – Mobile First

A abordagem **Mobile First** significa escrever estilos para telas pequenas primeiro e ir adicionando breakpoints para telas maiores.

```css
/* BASE: mobile (sem media query) */
.container {
  width: 100%;
  padding: 1rem;
}

.nav { display: none; } /* menu oculto em mobile */

.card {
  padding: 1rem;
  font-size: 1rem;
}

/* TABLET: ≥ 768px */
@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .nav { display: flex; }

  .grid-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* DESKTOP: ≥ 1024px */
@media (min-width: 1024px) {
  .grid-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* WIDE: ≥ 1440px */
@media (min-width: 1440px) {
  .grid-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Breakpoints comuns (inspirados no Bootstrap 5 / Tailwind CSS)

| Nome | Largura mínima | Dispositivo típico |
|------|---------------|-------------------|
| `xs` | 0px | Smartphones pequenos |
| `sm` | 576px | Smartphones grandes |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Desktops grandes |

### Outros Media Features

```css
/* Orientação */
@media (orientation: landscape) { }
@media (orientation: portrait) { }

/* Preferências do sistema */
@media (prefers-color-scheme: dark) { }
@media (prefers-reduced-motion: reduce) { }
@media (prefers-contrast: more) { }

/* Capacidades do dispositivo */
@media (hover: hover) { }       /* dispositivo tem hover */
@media (pointer: fine) { }     /* ponteiro preciso (mouse) */
@media (pointer: coarse) { }   /* ponteiro impreciso (touch) */

/* Resolução */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  /* Tela retina / HiDPI */
}

/* Container Queries (moderno) */
.widget {
  container-type: inline-size;
  container-name: card;
}
@container card (min-width: 400px) {
  .widget-conteudo { flex-direction: row; }
}
```

### Unidades Responsivas

```css
.elemento {
  /* Viewport */
  width: 100vw;       /* 100% da largura da viewport */
  height: 100vh;      /* 100% da altura da viewport */
  height: 100svh;     /* Small Viewport Height (melhor para mobile) */

  /* Relativas ao root */
  font-size: 1rem;    /* 1× o font-size do :root (padrão: 16px) */
  margin: 2rem;

  /* Relativas ao pai */
  width: 50%;
  font-size: 1.2em;

  /* Clamp: valor responsivo sem media query */
  font-size: clamp(1rem, 2.5vw, 2rem);  /* min, preferido, max */
  width: clamp(280px, 80%, 900px);
}
```

---

## 7. Pseudo-classes e Pseudo-elementos

```css
/* ── Pseudo-classes de estado ── */
a:hover { color: darkblue; }
a:focus { outline: 3px solid #0d6efd; }
a:active { opacity: 0.8; }
a:visited { color: purple; }

input:focus-visible { outline: 3px solid #0d6efd; }  /* apenas com teclado */
input:disabled { opacity: 0.5; cursor: not-allowed; }
input:checked { accent-color: #0d6efd; }
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:placeholder-shown { border-style: dashed; }

/* ── Pseudo-classes estruturais ── */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f8f9fa; }   /* ímpares: 1, 3, 5... */
li:nth-child(even) { background: white; }    /* pares: 2, 4, 6... */
li:nth-child(3n) { color: blue; }            /* de 3 em 3 */
p:not(.intro) { font-size: 0.9rem; }
section:empty { display: none; }

/* ── Pseudo-elementos ── */
p::first-line { font-variant: small-caps; }
p::first-letter { font-size: 3em; float: left; }

.botao::before {
  content: "→ ";
}
.botao::after {
  content: " ←";
}

/* Placeholder */
input::placeholder { color: #aaa; font-style: italic; }

/* Seleção de texto */
::selection { background: #0d6efd; color: white; }

/* Scrollbar (Chrome/Edge) */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
```

---

## 8. Transições e Animações

```css
/* ── Transitions ── */
.botao {
  background: #0d6efd;
  transition: background 0.3s ease, transform 0.15s ease;
}
.botao:hover {
  background: #0b5ed7;
  transform: translateY(-2px);
}

/* Transition shorthand */
/* transition: property duration timing-function delay */
.card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  transform: scale(1.02);
}

/* ── Animations ── */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.elemento {
  animation: fadeIn 0.5s ease forwards;
  /* animation: name duration timing delay iterations direction fill-mode */
}

/* Animação respeitando preferências de acessibilidade */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Metodologia BEM

BEM (Block, Element, Modifier) é uma convenção de nomenclatura CSS:

```css
/* Block: componente independente */
.card { }

/* Element: parte do block (separado por __) */
.card__titulo { }
.card__imagem { }
.card__conteudo { }
.card__botao { }

/* Modifier: variação do block ou element (separado por --) */
.card--destaque { }
.card--escuro { }
.card__botao--primario { }
.card__botao--secundario { }
```

```html
<article class="card card--destaque">
  <img class="card__imagem" src="..." alt="...">
  <div class="card__conteudo">
    <h2 class="card__titulo">Título</h2>
    <p class="card__texto">Descrição</p>
    <a class="card__botao card__botao--primario" href="#">Ler mais</a>
  </div>
</article>
```

---

## Práticas

| # | Arquivo | Descrição |
|---|---------|-----------|
| 01 | [Flexbox na Prática](praticas/01-flexbox.html) | Exercícios e demos de Flexbox |
| 02 | [CSS Grid na Prática](praticas/02-grid.html) | Layouts com CSS Grid |
| 03 | [Responsivo Mobile First](praticas/03-responsivo-mobile-first.html) | Design responsivo completo |
| 04 | [Variáveis CSS e Temas](praticas/04-variaveis-css.html) | Sistema de design com Custom Properties |

---

## Referências

- [Flexbox – MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [CSS Grid – MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox Froggy](https://flexboxfroggy.com/#pt-br) (jogo interativo)
- [Grid Garden](https://cssgridgarden.com/#pt-br) (jogo interativo)
- [CSS Tricks – Guia completo de Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Tricks – Guia completo de Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [web.dev – Learn CSS](https://web.dev/learn/css/)
- [Can I Use – Flexbox](https://caniuse.com/flexbox)
- [Can I Use – Grid](https://caniuse.com/css-grid)
