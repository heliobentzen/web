# Módulo 03 — CSS Moderno

> O CSS de hoje resolve com três linhas o que antes exigia trinta. Este módulo ensina o CSS atual, não o de 2015.

| | |
| --- | --- |
| **Carga horária** | 10 h (5 h expositivas + 5 h de prática) |
| **Pré-requisito** | [Módulo 02 — HTML Semântico](../02-html-semantico/README.md) |
| **Slides da aula** | [`slides.md`](slides.md) |
| **Práticas** | [`praticas/`](praticas/) |

---

## Objetivos de aprendizagem

Ao final deste módulo, você será capaz de:

1. **Prever** qual regra CSS vence um conflito, aplicando as regras de especificidade e cascata.
2. **Calcular** o tamanho final de um elemento a partir do box model.
3. **Escolher** entre Flexbox e Grid com base na natureza do layout.
4. **Construir** um layout responsivo pela abordagem Mobile First.
5. **Montar** um sistema de design mínimo com variáveis CSS, incluindo tema claro e escuro.
6. **Aplicar** recursos modernos — `clamp()`, `:has()`, container queries, `@layer` — em situações adequadas.

---

## Roteiro

```text
1. Como o CSS decide (cascata, especificidade, herança)
        ↓
2. Box model e unidades
        ↓
3. Variáveis e design tokens
        ↓
4. Flexbox   ──┐
5. Grid      ──┴→ 6. Quando usar cada um
        ↓
7. Responsividade: Mobile First
        ↓
8. Container queries      ← responsividade por componente
        ↓
9. Estados, transições e animações
        ↓
10. Organização (@layer, aninhamento)
```

---

## 1. Como o CSS decide

Quando duas regras disputam o mesmo elemento, o navegador decide em três etapas, nesta ordem.

### 1.1 Origem e importância

Estilo do autor vence o do navegador. `!important` inverte a lógica normal — por isso é o
último recurso, nunca o primeiro.

### 1.2 Especificidade

Conte o seletor em três posições: **(ids, classes, elementos)**.

| Seletor | Peso | Leitura |
| --- | --- | --- |
| `*` | 0,0,0 | Nenhum peso |
| `p` | 0,0,1 | Um elemento |
| `p span` | 0,0,2 | Dois elementos |
| `.card` | 0,1,0 | Uma classe |
| `.card p` | 0,1,1 | Uma classe + um elemento |
| `#titulo` | 1,0,0 | Um id |

Compara-se da esquerda para a direita: `1,0,0` vence `0,9,9`.

```css
.card p     { color: blue; }   /* 0,1,1 */
#titulo     { color: red;  }   /* 1,0,0 → vence */
```

### 1.3 Ordem de declaração

Empatou na especificidade? Vence a regra escrita **por último**. É por isso que a ordem
dos arquivos CSS importa.

### 1.4 Herança

Algumas propriedades passam de pai para filho automaticamente — `color`, `font-family`,
`line-height`, `text-align`. Outras não — `margin`, `padding`, `border`, `background`.

```css
body { color: #1f2937; font-family: system-ui; }
/* todo texto da página herda essas duas propriedades */
```

Defina tipografia e cor base no `body` e deixe a herança trabalhar.

### 1.5 `:is()`, `:where()` e `:has()`

```css
/* :is() agrupa — assume a MAIOR especificidade do grupo */
:is(h1, h2, h3) { margin-block: 0.5em; }

/* :where() agrupa com especificidade ZERO — ideal para reset */
:where(ul, ol) { padding-inline-start: 1.5rem; }

/* :has() olha para o conteúdo do elemento — o "seletor pai" */
.card:has(img) { padding-top: 0; }
label:has(input:checked) { font-weight: 700; }
form:has(:invalid) button[type="submit"] { opacity: 0.5; }
```

`:has()` resolve casos que antes exigiam JavaScript. É Baseline desde dezembro de 2023.

> **Experimente:** crie dois cards, um com imagem e outro sem, e aplique
> `.card:has(img) { border-color: green; }`. Nenhuma classe extra é necessária.

---

## 2. Box model e unidades

### 2.1 O box model

Todo elemento é uma caixa com quatro camadas, de dentro para fora:

```text
┌──────────── margin ────────────┐
│  ┌────────── border ────────┐  │
│  │  ┌────── padding ──────┐ │  │
│  │  │      content        │ │  │
│  │  └─────────────────────┘ │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

```css
.caixa { width: 200px; padding: 20px; border: 2px solid; }
/* Sem border-box: largura real = 200 + 40 + 4 = 244px */
```

Isso é contraintuitivo e causa erro de layout o tempo todo. A solução é universal:

```css
*, *::before, *::after { box-sizing: border-box; }
/* Agora width: 200px significa 200px na tela. */
```

Coloque isso no topo de todo projeto.

### 2.2 Unidades

| Unidade | Relativa a | Use para |
| --- | --- | --- |
| `rem` | Fonte raiz (16px por padrão) | Fontes, espaçamentos, breakpoints |
| `em` | Fonte do próprio elemento | Espaçamento interno de componentes |
| `%` | Dimensão do elemento pai | Larguras fluidas |
| `fr` | Espaço livre no grid | Divisão de colunas |
| `ch` | Largura do caractere "0" | Largura de coluna de texto (`60ch` é confortável) |
| `vw` / `vh` | Viewport | Elementos de tela cheia |
| `dvh` | Viewport **dinâmica** | Altura em celular, sem o pulo da barra de endereço |

**Nunca defina `font-size` em `px`.** Usuários que aumentam a fonte padrão do navegador
por baixa visão ficam sem efeito. `rem` respeita essa preferência.

O `100vh` em celular inclui a barra do navegador que aparece e some, causando um salto
visual. Use `100dvh`.

### 2.3 Valores fluidos com `clamp()` e `min()`

```css
h1 {
  /* mínimo | valor ideal, que escala | máximo */
  font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
}

.container {
  /* 100% da largura menos a margem, mas nunca além de 72rem */
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}
```

Um `clamp()` substitui três media queries e produz um resultado mais suave.

---

## 3. Variáveis e design tokens

Variáveis CSS transformam decisões repetidas em um ponto único de alteração.

```css
:root {
  /* cores */
  --cor-primaria: #0b5f31;
  --cor-destaque: #df2b2f;
  --cor-texto: #1f2937;
  --cor-fundo: #ffffff;
  --cor-superficie: #f8f9fa;

  /* espaçamento — escala consistente */
  --espaco-xs: 0.25rem;
  --espaco-sm: 0.5rem;
  --espaco-md: 1rem;
  --espaco-lg: 2rem;

  /* forma */
  --raio: 8px;
  --sombra: 0 2px 8px rgb(0 0 0 / 0.1);
}

.botao {
  background: var(--cor-primaria);
  color: white;
  padding: var(--espaco-sm) var(--espaco-md);
  border-radius: var(--raio);
}
```

### 3.1 Fallback

```css
.card { color: var(--cor-custom, var(--cor-texto)); }
/* usa --cor-custom se existir; senão, --cor-texto */
```

### 3.2 Tema claro e escuro

Como as variáveis são resolvidas em tempo de execução, trocar o tema é trocar valores:

```css
:root {
  --cor-fundo: #ffffff;
  --cor-texto: #1f2937;
  --cor-superficie: #f8f9fa;
}

@media (prefers-color-scheme: dark) {
  :root {
    --cor-fundo: #111827;
    --cor-texto: #f3f4f6;
    --cor-superficie: #1f2937;
  }
}

body {
  background: var(--cor-fundo);
  color: var(--cor-texto);
}
```

Nenhuma regra de componente precisa mudar. Esse é o ponto.

---

## 4. Flexbox — uma dimensão

Flexbox distribui espaço ao longo de **um eixo**: linha ou coluna.

```css
.container {
  display: flex;
  flex-direction: row;        /* row | column */
  justify-content: space-between;  /* eixo principal */
  align-items: center;             /* eixo transversal */
  flex-wrap: wrap;                 /* permite quebrar linha */
  gap: 1rem;                       /* espaço entre itens */
}
```

| Propriedade | Controla |
| --- | --- |
| `justify-content` | Distribuição no eixo principal |
| `align-items` | Alinhamento no eixo transversal |
| `gap` | Espaço entre itens (substitui `margin` nos filhos) |

Nos itens:

```css
.item {
  flex: 1 1 240px;
  /* crescer: 1 | encolher: 1 | base: 240px */
}
```

### 4.1 Padrões que você vai usar sempre

```css
/* Centralização absoluta */
.centralizado {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
}

/* Rodapé grudado no fim, mesmo com pouco conteúdo */
.pagina {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
.conteudo { flex: 1; }

/* Barra de navegação: logo à esquerda, menu à direita */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## 5. CSS Grid — duas dimensões

Grid controla **linhas e colunas ao mesmo tempo**.

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "cabecalho cabecalho"
    "barra     principal"
    "rodape    rodape";
  gap: 1rem;
  min-height: 100dvh;
}

.cabecalho { grid-area: cabecalho; }
.barra     { grid-area: barra; }
.principal { grid-area: principal; }
.rodape    { grid-area: rodape; }
```

O layout inteiro fica desenhado no CSS, legível como um mapa.

### 5.1 Grid responsivo sem media query

```css
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

- `auto-fit` — ajusta quantas colunas cabem
- `minmax(280px, 1fr)` — cada coluna tem no mínimo 280px e cresce igualmente

Uma coluna no celular, duas no tablet, quatro no monitor grande — sem uma media query.

> **Experimente:** monte seis cards com esse CSS e redimensione a janela devagar. Observe o
> momento em que o número de colunas muda sozinho.

---

## 6. Flexbox ou Grid?

| Pergunta | Resposta |
| --- | --- |
| Preciso alinhar itens em **uma** linha ou coluna? | Flexbox |
| Preciso controlar linhas **e** colunas? | Grid |
| O conteúdo determina o tamanho? | Flexbox |
| O layout determina o tamanho? | Grid |
| É a estrutura da página? | Grid |
| É o conteúdo interno de um componente? | Flexbox |

Na prática eles se combinam: **Grid para a página, Flex dentro de cada componente**.

```css
.pagina { display: grid; grid-template-columns: 250px 1fr; }
.card   { display: flex; flex-direction: column; gap: 0.75rem; }
```

---

## 7. Responsividade: Mobile First

Escreva primeiro o layout do celular — o mais restrito — e vá acrescentando conforme sobra espaço.

```css
/* BASE: mobile. Sem media query. */
.container { width: 100%; padding: 1rem; }
.grid-cards { display: grid; grid-template-columns: 1fr; gap: 1rem; }

/* TABLET */
@media (min-width: 48rem) {   /* 768px */
  .grid-cards { grid-template-columns: repeat(2, 1fr); }
}

/* DESKTOP */
@media (min-width: 64rem) {   /* 1024px */
  .container { padding: 2rem; }
  .grid-cards { grid-template-columns: repeat(3, 1fr); }
}
```

Por que Mobile First e não o contrário: começar pelo desktop leva a escrever regras para
depois desfazê-las com `@media (max-width)`. O CSS fica cheio de sobrescrita. Começando
pelo mobile, você só **adiciona**.

### 7.1 Breakpoints

Não existe lista oficial. Escolha os pontos onde **seu** layout quebra, não os tamanhos de
aparelhos específicos — a variedade é grande demais para isso funcionar. Um conjunto
razoável de partida:

| Nome | Largura |
| --- | --- |
| Tablet | `48rem` (768px) |
| Desktop | `64rem` (1024px) |
| Desktop grande | `80rem` (1280px) |

### 7.2 Imagens responsivas

```css
img { max-width: 100%; height: auto; }
```

```html
<img src="foto.jpg" alt="..." width="800" height="600" loading="lazy">
```

Declarar `width` e `height` no HTML reserva o espaço antes do download e evita o
deslocamento de conteúdo (o CLS medido no [Módulo 07](../07-devtools/README.md)).

---

## 8. Container queries

Media query pergunta o tamanho da **tela**. Container query pergunta o tamanho do
**espaço disponível para o componente** — que é a pergunta certa quando o mesmo card
aparece na sidebar estreita e no conteúdo largo.

```css
.area-de-cards {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: 0.5rem;
}

/* quando o CONTAINER tiver 30rem, não a tela */
@container (min-width: 30rem) {
  .card {
    grid-template-columns: 120px 1fr;
  }
}
```

O componente passa a se adaptar sem saber onde foi colocado. Baseline desde 2023.

---

## 9. Estados, transições e animações

### 9.1 Pseudo-classes de estado

```css
a:hover { color: var(--cor-primaria); }

/* :focus-visible mostra o anel só para quem navega por teclado */
a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--cor-primaria);
  outline-offset: 2px;
}

/* Só marca como inválido depois que o usuário digitou algo */
input:invalid:not(:placeholder-shown) { border-color: #b91c1c; }

li:nth-child(odd) { background: var(--cor-superficie); }
```

**Nunca escreva `outline: none` sem oferecer alternativa visível.** Quem navega por teclado
perde completamente a noção de onde está. Assunto do [Módulo 04](../04-acessibilidade/README.md).

### 9.2 Transições e animações

```css
.card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.2);
}

@keyframes surgir {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.destaque { animation: surgir 0.4s ease-out; }
```

**Anime apenas `transform` e `opacity`.** Elas ficam na etapa de composição do pipeline
(veja o [Módulo 01](../01-arquitetura-web/README.md)) e rodam na GPU. Animar `width`,
`height`, `top` ou `left` força recálculo de layout a cada quadro e trava em aparelho modesto.

### 9.3 Respeite quem prefere menos movimento

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Movimento excessivo provoca náusea e crise vestibular em parte dos usuários. Esse bloco é
obrigatório em projeto sério, não um detalhe de refinamento.

---

## 10. Organização do CSS

### 10.1 Aninhamento nativo

Desde 2023 o CSS aninha sem pré-processador:

```css
.card {
  padding: 1rem;
  border-radius: var(--raio);

  & h3 { margin: 0; font-size: 1.25rem; }

  &:hover { box-shadow: var(--sombra); }

  @media (min-width: 48rem) {
    padding: 1.5rem;
  }
}
```

Cuidado: aninhar muito produz seletores longos e específicos demais. Três níveis é o limite razoável.

### 10.2 Camadas com `@layer`

`@layer` define a ordem de prioridade entre grupos de regras, independentemente da especificidade:

```css
@layer reset, base, componentes, utilitarios;

@layer componentes {
  .botao { background: var(--cor-primaria); }
}

@layer utilitarios {
  .oculto { display: none; }   /* vence, por estar em camada posterior */
}
```

Isso elimina a maior parte dos usos de `!important`: em vez de escalar a especificidade,
você declara a intenção de prioridade.

---

## Erros comuns

| Sintoma | Causa | Correção |
| --- | --- | --- |
| Elemento maior do que a largura definida | Falta `box-sizing: border-box` | Adicione o reset universal |
| Layout "pula" no celular ao rolar | `100vh` com barra do navegador | Troque por `100dvh` |
| Texto não aumenta com o zoom do usuário | `font-size` em `px` | Use `rem` |
| Regra não aplica e nada parece errado | Outra regra tem especificidade maior | Painel Computed do DevTools mostra quem venceu |
| CSS cheio de `!important` | Guerra de especificidade | Reorganize com `@layer` |
| Animação travando em celular | Anima `width`, `left` ou `top` | Use `transform` |
| Usuário de teclado se perde na página | `outline: none` | Estilize `:focus-visible` |
| Um seletor inválido derruba a regra seguinte | Erro de sintaxe | O painel Styles marca a regra inválida |

---

## Checklist de autoavaliação

- [ ] Calcular a especificidade de um seletor e prever qual regra vence
- [ ] Calcular a largura final de um elemento com e sem `border-box`
- [ ] Justificar a escolha de `rem`, `em`, `%`, `fr` ou `dvh` para um caso dado
- [ ] Escrever um `clamp()` para tipografia fluida
- [ ] Montar um conjunto de variáveis CSS com tema claro e escuro
- [ ] Centralizar um elemento com Flexbox
- [ ] Montar um layout de página completo com `grid-template-areas`
- [ ] Criar uma galeria responsiva sem usar media query
- [ ] Escrever CSS Mobile First com dois breakpoints
- [ ] Explicar quando container query é melhor que media query
- [ ] Escrever uma animação performática e respeitar `prefers-reduced-motion`

---

## Práticas

| # | Arquivo | Foco | Objetivos trabalhados |
| --- | --- | --- | --- |
| 01 | [Flexbox](praticas/01-flexbox.html) | Eixos, alinhamento, `gap` | 3 |
| 02 | [Grid](praticas/02-grid.html) | Colunas, áreas nomeadas | 3 |
| 03 | [Responsivo Mobile First](praticas/03-responsivo-mobile-first.html) | Breakpoints e fluidez | 4 |
| 04 | [Variáveis CSS](praticas/04-variaveis-css.html) | Tokens e temas | 5 |
| 05 | [Layout intermediário](praticas/05-layout-intermediario.html) | Página completa | 3, 4, 6 |

Há também um [índice das práticas](praticas/index.html) para abrir no navegador.

---

## Exercícios

### Nível 1 — Fixação

1. Calcule a especificidade de: `.nav a:hover`, `#menu .item`, `ul li span`, `:where(.card) h2`.
   Ordene da mais forte para a mais fraca.
2. Um elemento tem `width: 300px; padding: 16px; border: 4px solid; margin: 20px`. Qual a
   largura ocupada na tela com `content-box` e com `border-box`?
3. Complete os jogos [Flexbox Froggy](https://flexboxfroggy.com/#pt-br) e
   [Grid Garden](https://cssgridgarden.com/#pt-br) até o último nível.

### Nível 2 — Aplicação

4. Reproduza um layout de blog com Grid: cabeçalho fixo, barra lateral de 250px, área de
   conteúdo e rodapé. Use `grid-template-areas`. No celular, tudo em coluna única.
5. Construa uma galeria de oito cards que se reorganiza sozinha, sem nenhuma media query.
   Cada card usa Flexbox internamente e mantém o botão alinhado à base, mesmo com textos de
   tamanhos diferentes.
6. Monte um mini design system: variáveis de cor, espaçamento e tipografia; tema claro e
   escuro automáticos por `prefers-color-scheme`; e um botão com quatro estados
   (normal, hover, focus-visible, disabled).

### Nível 3 — Desafio

7. **Componente independente do contexto.** Crie um card que exibe a imagem acima do texto
   quando está em um espaço estreito e ao lado do texto quando está em um espaço largo.
   Use container query. Coloque o mesmo card em duas regiões de larguras diferentes na
   mesma página para comprovar que funciona.
8. **Refatoração.** Pegue este CSS e reescreva sem nenhum `!important` e sem `id` nos
   seletores, mantendo o resultado visual idêntico. Explique a estratégia usada.

```css
#conteudo .lista li a { color: blue !important; }
#conteudo .lista li a:hover { color: red !important; }
.destaque { color: green; }
```

---

## Referências

- [CSS — MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [Flexbox — guia completo MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
- [CSS Grid — guia completo MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout)
- [Container Queries — MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_containment/Container_queries)
- [web.dev — Learn CSS](https://web.dev/learn/css/)
- [web.dev — Learn Responsive Design](https://web.dev/learn/design/)
- [A Complete Guide to Flexbox — CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy](https://flexboxfroggy.com/#pt-br) · [Grid Garden](https://cssgridgarden.com/#pt-br)

---

**Navegação:** [◀ Módulo 02](../02-html-semantico/README.md) · [Índice](../../README.md) · [Módulo 04 ▶](../04-acessibilidade/README.md)
