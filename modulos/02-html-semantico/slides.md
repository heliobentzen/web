---
marp: true
theme: default
size: 16:9
paginate: true
style: |
  section {
    font-size: 32px;
    line-height: 1.28;
    background: radial-gradient(circle at top right, #e9f7ef 0%, #ffffff 55%, #f4fbf7 100%);
    color: #1f2937;
  }
  h1, h2, h3 {
    color: #0b5f31;
  }
  h1 {
    font-size: 1.9em;
  }
  h2 {
    font-size: 1.25em;
  }
  code {
    font-size: 0.95em;
  }
  pre {
    font-size: 0.82em;
    line-height: 1.25;
  }
  table {
    font-size: 0.82em;
  }
  li {
    margin: 0.25em 0;
  }
  .card {
    background: #ffffff;
    border: 2px solid #b7e4c7;
    border-radius: 14px;
    padding: 14px 18px;
    margin: 8px 0;
    box-shadow: 0 6px 16px rgba(11, 95, 49, 0.1);
  }
  .pill {
    display: inline-block;
    margin: 4px 6px 4px 0;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid #95d5b2;
    background: #ecfdf3;
    color: #166534;
    font-size: 0.8em;
  }
  .kpi {
    border-left: 6px solid #0b5f31;
    background: #ffffff;
    padding: 10px 14px;
    border-radius: 10px;
    margin: 8px 0;
  }
  .prof {
    color: #14532d;
    font-size: 0.95em;
    font-weight: 700;
    margin-top: 8px;
  }
  .ok {
    color: #0f766e;
    font-weight: 700;
  }
  .warn {
    color: #b45309;
    font-weight: 700;
  }
  .bad {
    color: #b91c1c;
    font-weight: 700;
  }
---

# Módulo 02

# HTML Semântico

![bg right:30% w:370](../../assets/ifpe-logo.svg)

<div class="card">
Curso ADS • versão visual • com práticas evolutivas
</div>

<div class="prof">
Prof. Hélio Bentzen
</div>

---

## Objetivos da Aula

- Estruturar páginas HTML de forma profissional
- Usar semântica para acessibilidade e SEO
- Aplicar os principais elementos HTML com critério
- Construir formulário e metadados prontos para produção

---

## Roteiro Visual

```text
1) Fundação HTML
2) Semântica de layout
3) Conteúdo textual
4) Links, listas, mídia e tabelas
5) Prática 1 (estrutura semântica)
6) Formulários e validação
7) SEO e Open Graph
8) Prática 2 (página completa)
```

---

## Fundação HTML: Estrutura Base

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título da Página</title>
  <meta name="description" content="Resumo curto da página">
</head>
<body>
  <main>Conteúdo principal</main>
</body>
</html>
```

<span class="pill">DOCTYPE</span><span class="pill">lang</span><span class="pill">meta charset</span><span class="pill">viewport</span><span class="pill">title</span>

---

## Exemplo Gradual 1: Página Semântica

### Passo 1: Estrutura mínima

```html
<header>Meu site</header>
<main><h1>Início</h1></main>
<footer>Rodapé</footer>
```

---

### Passo 2: Navegação e seção

```html
<header><nav><a href="/">Home</a></nav></header>
<main><section><h2>Destaques</h2></section></main>
```

---

### Passo 3: Conteúdo completo

```html
<main>
  <article><h2>Notícia</h2><p>Conteúdo...</p></article>
  <aside>Links relacionados</aside>
</main>
```

---

## Mapa Mental: Como o HTML Vira Página

```text
Usuário abre URL
      ↓
Navegador lê HTML
      ↓
Semântica ajuda: tela + leitor + SEO
      ↓
Página mais clara e fácil de manter
```

---

## Semântica de Layout

<div class="card">
header • nav • main • section • article • aside • footer
</div>

```html
<header>Topo</header>
<nav>Menu</nav>
<main>
  <article>Post independente</article>
  <section>Bloco temático</section>
</main>
<footer>Rodapé</footer>
```

---

## Mapa Visual de Layout

```text
┌───────────────────────────────┐
│ header                        │
├───────────────┬───────────────┤
│ nav           │ main          │
│               │ ├─ article    │
│               │ └─ section    │
├───────────────┴───────────────┤
│ footer                        │
└───────────────────────────────┘
```

---

## article x section x div

| Elemento | Quando usar |
|---|---|
| `article` | Conteúdo independente (post, card, notícia) |
| `section` | Agrupamento temático com título |
| `div` | Bloco sem significado semântico |

<div class="card">
Regra prática: tente article/section antes de div.
</div>

---

## Headings (h1-h6) sem Erro

```html
<h1>Título principal</h1>
  <h2>Seção</h2>
    <h3>Subseção</h3>
```

- Use ordem lógica
- Evite pular de `h2` para `h4`
- O visual do tamanho é CSS, não hierarquia

---

## Elementos de Texto Importantes

```html
<p><strong>Importante</strong> e <em>ênfase</em>.</p>
<blockquote><p>Citação longa.</p></blockquote>
<q>Citação curta</q>
<abbr title="HyperText Markup Language">HTML</abbr>
<time datetime="2026-04-23">23/04/2026</time>
<code>document.querySelector()</code>
```

---

## Listas e Navegação

```html
<ul><li>Item</li></ul>
<ol><li>Passo 1</li><li>Passo 2</li></ol>

<nav aria-label="Navegação principal">
  <a href="/">Home</a>
  <a href="/contato">Contato</a>
</nav>
```

<div class="kpi">
Use `nav` quando os links forem de navegação estrutural.
</div>

---

## Imagens e Mídia

```html
<img src="produto.jpg" alt="Tênis preto modelo X" width="640" height="360">

<figure>
  <img src="grafico.png" alt="Vendas em alta no Q2">
  <figcaption>Resumo do resultado trimestral.</figcaption>
</figure>

<video controls><source src="video.mp4" type="video/mp4"></video>
```

---

## Tabelas: Só para Dados

```html
<table>
  <caption>Vendas por região</caption>
  <thead><tr><th>Região</th><th>Total</th></tr></thead>
  <tbody><tr><th scope="row">Sul</th><td>R$ 175k</td></tr></tbody>
</table>
```

<div class="card">
Tabela não é para layout visual de página.
</div>

---

## Prática 1 (Evolutiva): Estrutura Semântica

### Entrega

1. Página com `header`, `nav`, `main`, `section`, `article`, `footer`
2. Hierarquia correta de headings
3. 1 imagem com `alt` informativo
4. 1 lista ordenada e 1 não ordenada

### Critério de sucesso

- Sem uso de `div` para tudo
- Estrutura legível no inspector

---

## Formulário Acessível (Base)

```html
<form>
  <label for="nome">Nome</label>
  <input id="nome" type="text" required>

  <label for="email">Email</label>
  <input id="email" type="email" required>

  <button type="submit">Enviar</button>
</form>
```

---

## Exemplo Gradual 2: Formulário

### Nível 1: Campos básicos

```html
<label for="nome">Nome</label>
<input id="nome" type="text" required>
```

---

### Nível 2: Tipos corretos

```html
<label for="email">Email</label>
<input id="email" type="email" required>
<input id="telefone" type="tel">
```

---

### Nível 3: Estrutura profissional

```html
<fieldset>
  <legend>Contato</legend>
  <select id="assunto"></select>
  <textarea id="mensagem"></textarea>
</fieldset>
```

---

## Agrupando Campos com fieldset

```html
<fieldset>
  <legend>Dados Pessoais</legend>
  <label for="telefone">Telefone</label>
  <input id="telefone" type="tel">
</fieldset>
```

<div class="card">
Melhora leitura para usuários e leitores de tela.
</div>

---

## Inputs Mais Comuns (Parte 1)

| Tipo | Uso |
|---|---|
| `text` | Texto geral |
| `email` | Email com validação |
| `tel` | Telefone |
| `date` | Data |
| `password` | Senha |
| `number` | Quantidade |

---

## Inputs Mais Comuns (Parte 2)

| Tipo | Uso |
|---|---|
| `checkbox` | Múltipla escolha |
| `radio` | Escolha única |
| `file` | Upload |
| `url` | Endereço web |
| `search` | Busca |
| `range` | Slider numérico |

---

## SEO: Metatags Essenciais

```html
<title>Título da Página - Site</title>
<meta name="description" content="Resumo de 150-160 caracteres.">
<link rel="canonical" href="https://site.com/pagina">
<meta name="robots" content="index, follow">
```

---

## SEO Social: Open Graph

```html
<meta property="og:title" content="Título social">
<meta property="og:description" content="Descrição social">
<meta property="og:image" content="https://site.com/og.jpg">
<meta property="og:type" content="website">
```

<div class="card">
Imagem recomendada: 1200 x 630 px.
</div>

---

## Dados Estruturados (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guia de HTML Semântico",
  "author": { "@type": "Person", "name": "Seu Nome" }
}
</script>
```

---

## Checklist de Qualidade HTML

- [ ] Um `h1` principal por página
- [ ] `label` conectado em todos os campos
- [ ] `alt` em imagens informativas
- [ ] `title` e `description` preenchidos
- [ ] Estrutura semântica clara (`main`, `article`, `section`)

---

## Bom x Ruim (Visual)

| Situação | Bom | Ruim |
|---|---|---|
| Imagem | <span class="ok">`alt="Pessoa estudando HTML"`</span> | <span class="bad">`alt=""`</span> |
| Campo | <span class="ok">`label + id`</span> | <span class="bad">placeholder sem label</span> |
| Headings | <span class="ok">h1 → h2 → h3</span> | <span class="bad">h1 → h4</span> |

---

## Prática 2 (Evolutiva): Página Completa

### Missão

Criar uma página de contato com:

1. Layout semântico completo
2. Formulário com `fieldset`, `legend`, `text`, `email`, `tel`, `select`, `textarea`
3. Metatags (`title`, `description`, `canonical`, `robots`)
4. Open Graph básico

### Bônus

- Adicionar JSON-LD tipo `Organization`
- Validar no DevTools e Lighthouse

---

## Práticas do Módulo

- `praticas/01-estrutura-basica.html`
- `praticas/02-formulario-completo.html`
- `praticas/03-seo-metatags.html`
- `praticas/02-intermediario.html`

<div class="kpi">
Fluxo recomendado: prática 1 → teoria de formulário/SEO → prática 2.
</div>

---

## Fechamento

<div class="card">
HTML semântico = código mais claro, acessível e com melhor performance em busca.
</div>

### Próxima aula

CSS moderno: Flexbox, Grid e responsividade.
