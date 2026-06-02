---
marp: true
theme: default
size: 16:9
paginate: true
header: '![w:90](ifpe-logo.png)'
footer: 'Introducao a Computacao · IFPE'
style: |
  section {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: #ffffff;
    color: #222;
    font-size: 28px;
    line-height: 1.35;
    padding: 56px 64px;
  }
  header { top: 16px; right: 24px; left: auto; }
  header img { margin: 0; }
  footer {
    color: #666;
    font-size: 0.52em;
    border-top: 2px solid #2f9e41;
    padding-top: 4px;
  }
  h1 {
    color: #2f9e41;
    font-size: 1.7em;
    border-bottom: 3px solid #cd191e;
    padding-bottom: 6px;
    margin-bottom: 0.4em;
  }
  h2 {
    color: #2f9e41;
    font-size: 1.2em;
    margin-bottom: 0.3em;
  }
  h3 {
    font-size: 1em;
    margin-bottom: 0.2em;
  }
  ul, ol { margin-top: 0.3em; }
  li { margin: 0.22em 0; }
  strong { color: #cd191e; }
  em { color: #2f9e41; font-style: normal; }
  table {
    font-size: 0.72em;
    border-collapse: collapse;
    width: 100%;
  }
  th {
    background: #2f9e41;
    color: #fff;
    padding: 6px 8px;
  }
  td {
    border: 1px solid #ddd;
    padding: 5px 8px;
    background: #fafafa;
  }
  code {
    background: #f0f0f0;
    color: #cd191e;
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  pre {
    background: #f7f7f7 !important;
    border-radius: 8px;
    border: 1px solid #ddd;
    padding: 12px;
    margin: 0.4em 0;
  }
  pre code {
    color: #333;
    background: none;
    font-size: 0.8em;
    line-height: 1.25;
  }
  blockquote {
    border-left: 4px solid #2f9e41;
    background: #f0faf0;
    padding: 8px 14px;
    border-radius: 0 8px 8px 0;
    color: #333;
  }
  a { color: #2f9e41; }
  section::after { color: #999; font-size: 0.65em; }
  section.capa {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  section.capa h1 {
    border: none;
    font-size: 1.55em;
    margin-bottom: 0.15em;
  }
  section.capa h2 { margin-top: 0; }
---

<!-- _class: capa -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

![w:220](ifpe-logo.png)

# Introducao a Computacao

## Modulo 03 · CSS Moderno

**Prof. Helio Bentzen**
IFPE · Analise e Desenvolvimento de Sistemas

---

# Roteiro da Aula

- Seletores e especificidade
- Box model
- Variaveis CSS
- Flexbox
- CSS Grid
- Responsividade (Mobile First)
- Pseudo-classes e animacoes

---

# Seletores Basicos

```css
* { box-sizing: border-box; }          /* todos */
p { line-height: 1.6; }                /* tipo */
.card { background: white; }           /* classe */
#header { position: sticky; }          /* id */
input[type="email"] { border: 1px solid; }
.nav a { color: white; }               /* descendente */
```

```css
.card.destaque { border: 2px solid gold; } /* combinacao */
```

---

# Especificidade (regra que vence)

| Seletor | Peso |
|---|---|
| `*` | 0,0,0,0 |
| `p` / `div` | 0,0,0,1 |
| `.classe` / `[attr]` / `:hover` | 0,0,1,0 |
| `#id` | 0,1,0,0 |
| `style=""` | 1,0,0,0 |

```css
.card p { color: blue; }       /* 0,0,1,1 */
#titulo { color: red; }        /* 0,1,0,0 -> vence */
```

---

# Box Model

Todo elemento e uma caixa com:

- **Content**
- **Padding**
- **Border**
- **Margin**

```css
.elemento {
  width: 200px;
  padding: 20px;
  border: 2px solid;
}
```

```css
/* recomendado */
*, *::before, *::after { box-sizing: border-box; }
```

---

# Variaveis CSS

```css
:root {
  --cor-primaria: #0d6efd;
  --cor-texto: #212529;
  --espaco-md: 1rem;
  --borda-radius: 8px;
}

.botao {
  background: var(--cor-primaria);
  color: white;
  padding: var(--espaco-md);
  border-radius: var(--borda-radius);
}
```

```css
/* fallback */
.card { color: var(--cor-custom, var(--cor-texto)); }
```

---

# Flexbox (1 dimensao)

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

Use quando o layout e principalmente em **linha** ou **coluna**.

---

# Padroes Uteis com Flex

```css
/* centralizacao perfeita */
.centralizado {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* pagina com footer no fim */
.pagina {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.conteudo { flex: 1; }
```

---

# CSS Grid (2 dimensoes)

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 1rem;
}
```

Use quando voce precisa controlar **linhas e colunas** ao mesmo tempo.

---

# Grid Responsivo de Cards

```css
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

- `auto-fit`: colapsa colunas vazias
- `minmax(280px, 1fr)`: minimo legivel + crescimento fluido

---

# Mobile First

```css
/* base mobile */
.container { width: 100%; padding: 1rem; }
.grid-cards { display: grid; grid-template-columns: 1fr; }

/* tablet */
@media (min-width: 768px) {
  .grid-cards { grid-template-columns: repeat(2, 1fr); }
}

/* desktop */
@media (min-width: 1024px) {
  .grid-cards { grid-template-columns: repeat(3, 1fr); }
}
```

---

# Pseudo-classes e Pseudo-elementos

```css
a:hover { color: darkblue; }
a:focus-visible { outline: 3px solid #0d6efd; }
input:invalid { border-color: red; }
li:nth-child(odd) { background: #f8f9fa; }

.botao::before { content: "-> "; }
::selection { background: #0d6efd; color: white; }
```

---

# Transicoes e Animacoes

```css
.card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  transform: translateY(-3px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

# Praticas do Modulo

| # | Arquivo | Foco |
|---|---|---|
| 01 | [praticas/01-flexbox.html](praticas/01-flexbox.html) | Flexbox |
| 02 | [praticas/02-grid.html](praticas/02-grid.html) | Grid |
| 03 | [praticas/03-responsivo-mobile-first.html](praticas/03-responsivo-mobile-first.html) | Responsividade |
| 04 | [praticas/04-variaveis-css.html](praticas/04-variaveis-css.html) | Variaveis e temas |

---

# Referencias

- [MDN - Flexbox](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN - CSS Grid](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox Froggy](https://flexboxfroggy.com/#pt-br)
- [Grid Garden](https://cssgridgarden.com/#pt-br)
- [web.dev - Learn CSS](https://web.dev/learn/css/)

---

# Encerramento

**Objetivo da semana:**

- Entender quando usar Flexbox e quando usar Grid
- Construir layout responsivo com Mobile First
- Consolidar um mini design system com variaveis CSS
